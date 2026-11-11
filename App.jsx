import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

const App = () => {
  const taskTitle = "Test task";
  const [taskDate, setTaskDate] = useState(null);
  const [selectedTask, setSelectedTask] = useState(false);
  const handleDateChange = (event, date) => {
    setTaskDate(date);
    setSelectedTask(false);
  };

  const handleTaskSelect = () => {
    if (selectedTask) return;
    setSelectedTask(true);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.taskItem} onPress={handleTaskSelect}>
        <Text style={styles.taskTitle}>{taskTitle}</Text>
        <Text>{taskDate ? taskDate.toLocaleDateString() : "No Due Date"}</Text>
      </TouchableOpacity>
      {selectedTask && (
        <DateTimePicker
          testID="date-picker"
          value={taskDate || new Date()}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={handleDateChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  taskItem: {
    minWidth: "80%",
    borderWidth: 1,
    borderColor: "lightgray",
    borderRadius: 5,
  },
  taskTitle: {
    fontSize: 16,
  },
});

export default App;
