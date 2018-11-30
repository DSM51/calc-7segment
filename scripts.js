function find(selector) {
	return document.querySelector(selector);
}

function on(segment) {
	find('.'+segment).classList.add('on');
}

function off(segment) {
	find('.'+segment).classList.remove('on');
}

function is_on(segment) {
	return find('.'+segment).classList.contains('on');
}

function on_enter(segment, lambda) {
	find('.'+segment).addEventListener('click', lambda, false);
}

function toogle(segment) {
	if (is_on(segment)) {
		off(segment);
	} else {
		on(segment);
	}
}

window.onload = function() {
	var segments = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
	var current = 0x6d;

	function padding(string, size) {
		while (string.length < size) {
			string = "0" + string;
		}
		return string;
	}

	function display(value) {
		find('#binary').textContent = padding(value.toString(2), 8);
		find('#hexadecimal').textContent = padding(value.toString(16), 2);
		find('#decimal').textContent = padding(value.toString(10), 3);
	}

	function update(segment) {
		var index = segments.indexOf(segment);
		var mask = 1 << index;

		if (is_on(segment)) {
			current |= mask;
		} else {
			current &= ~mask;
		}

		display(current);
	}

	segments.forEach(function(segment, index) {
		var mask = 1 << index;

		if ((current & mask) == mask) {
			on(segment);
		} else {
			off(segment);
		}

		on_enter(segment, function() {
			toogle(segment);
			update(segment);
		});
	});

	display(current);
}
