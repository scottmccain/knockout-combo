# knockout-combo
Custom combo box binding for knockout.

Usage:

        $(document).ready(function() {

            var index = 0;
            var viewModel = {

                values: ko.observableArray([{ display: 'A', value: 0 }, { display: 'B', value: 1 }, { display: 'C', value: 2 }]),
                addValue: function() {
                    viewModel.values.push({ display: 'D', value: index++ });
                }

            };

            ko.applyBindings(viewModel);

        });