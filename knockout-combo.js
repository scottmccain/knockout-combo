(function() {
	String.prototype.format = function() {
		var args = arguments;
		return this.replace(/\{\{|\}\}|\{(\d+)\}/g, function(m, n) {
			if (m == "{{") {
				return "{";
			}
			if (m == "}}") {
				return "}";
			}
			return args[n];
		});
	};

	// Private function
	function buildList(values, displayMember, valueMember) {
		var $l = $('<ul class="dropdown-menu"></ul>');
		for (var i = 0; i < values.length; i++) {
			var $li = $('<li></li>');
			//$li.append($('<a href="#"></a>').text(values[i]));

			var comboValue = '', display = '';
			if (displayMember != '' && valueMember != '') {
				comboValue = values[i][valueMember];
				display = values[i][displayMember];
			} else {
				comboValue = display = values[i];
			}

			$li.append($('<a href="#" data-value="' + comboValue + '"></a>').text(display));

			$l.append($li);
		}

		return $l;
	}

	ko.bindingHandlers.combobox = {
		init: function () {
			// TODO: get placeholder information from viewmodel
			// prebuild the input
			//$input = $('<input type="text" class="form-control" placeholder="Enter or Select a Value"/>');
			console.log('init!');
		},
		update: function (element, valueAccessor, allBindingsAccessor) {
			var allBindings = allBindingsAccessor();

			// Empty the element
			while (element.firstChild)
				ko.removeNode(element.firstChild);

			// First get the latest data that we're bound to
			var value = valueAccessor();

			// Next, whether or not the supplied model property is observable, get its current value
			var values = ko.utils.unwrapObservable(value);

			var placeholderText = allBindings.placeholderText || '';
			var displayMember = allBindings.displayMember || '';
			var valueMember = allBindings.valueMember || '';

			// create input
			element = $(element);

			var $input = $('<input type="text" class="form-control" placeholder="' + placeholderText + '" data-id="dropdown-value"/>');

			// build list - bind based on display and value member if present
			var $container = $('<div></div>');
			$container.addClass('input-group');

			$container.append($input);

			var $buttonSpan = $('<span></span>');
			$buttonSpan.addClass('input-group-btn');

			var $dropdownButton = $('<button type="button"></button>');
			$dropdownButton.addClass('btn btn-default dropdown-toggle');
			$dropdownButton.attr('data-toggle', 'dropdown');

			var $caret = $('<span class="caret"></span>');

			$dropdownButton.append($caret);
			$buttonSpan.append($dropdownButton);

			var $list = buildList(values, displayMember, valueMember);

			$buttonSpan.append($list);
			$container.append($buttonSpan);

			element.append($container);

			$dropdownButton.on('click', function(event) {

				var parentOffset = $($dropdownButton[0].parentNode).offset();
				var offset = $list.outerWidth();

				if ((parentOffset.left - outerWidth) < 0) {
					offset = offset - Math.abs(parentOffset.left - offset);
				}

				$list.css('left', offset * -1);
			});

			$list.on('click', 'li', function(event) {

				var $target = $(event.currentTarget);

				var $span = $target.closest('.input-group-btn');
				var $inputTarget = $target.closest('.input-group');

				var $a = $target.find('a');

				var dataValue = $a.attr('data-value');

				$inputTarget.find('[data-id="dropdown-value"]').val(dataValue);

				$span.find('[data-bind="dropdown-value"]')
					.val(dataValue)
					.end()
					.children('.dropdown-toggle')
					.dropdown('toggle');

				return false;

			});


		}
	};

})();
