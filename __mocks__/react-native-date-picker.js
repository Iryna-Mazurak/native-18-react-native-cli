const mockDatePicker = jest.fn();
const DatePicker = (props) => {
  mockDatePicker(props);
  return props.open ? (
    <button testID="date-picker">Mock DatePicker</button>
  ) : null;
};

module.exports = DatePicker;
module.exports.mockDatePicker = mockDatePicker;
