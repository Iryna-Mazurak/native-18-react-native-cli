import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  FlatList,
  StyleSheet,
} from "react-native";
import DatePicker from "react-native-date-picker";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  const handleAddTask = () => {
    const trimmedTitle = taskTitle.trim();

    if (!trimmedTitle) return;

    if (editingTaskId) {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === editingTaskId
            ? { ...task, title: trimmedTitle }
            : task
        )
      );

      setEditingTaskId(null);
    } else {
      const newTask = {
        id: `${Date.now()}-${Math.random()}`,
        title: trimmedTitle,
        dueDate: null,
      };

      setTasks((prevTasks) => [...prevTasks, newTask]);
    }

    setTaskTitle("");
  };

  const handleEditTask = (task) => {
    setTaskTitle(task.title);
    setEditingTaskId(task.id);
  };

  const handleDeleteTask = (id) => {
    setTasks((prevTasks) =>
      prevTasks.filter((task) => task.id !== id)
    );
  };

  const handleOpenDatePicker = (id) => {
    setSelectedTaskId(id);
  };

  const handleConfirmDate = (date) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === selectedTaskId
          ? { ...task, dueDate: date }
          : task
      )
    );

    setSelectedTaskId(null);
  };

  const handleCancelDate = () => {
    setSelectedTaskId(null);
  };

  const selectedTask = tasks.find(
    (task) => task.id === selectedTaskId
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>My To-Do List</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter task title"
          value={taskTitle}
          onChangeText={setTaskTitle}
        />

        <Pressable
          style={styles.addButton}
          onPress={handleAddTask}
        >
          <Text style={styles.buttonText}>
            {editingTaskId ? "Save" : "Add Task"}
          </Text>
        </Pressable>
      </View>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <Text style={styles.taskTitle}>{item.title}</Text>

            <Pressable
              onPress={() => handleOpenDatePicker(item.id)}
            >
              <Text style={styles.dateText}>
                {item.dueDate
                  ? item.dueDate.toLocaleString()
                  : "No Due Date"}
              </Text>
            </Pressable>

            <View style={styles.actions}>
              <Pressable
                onPress={() => handleEditTask(item)}
              >
                <Text style={styles.editButton}>Edit</Text>
              </Pressable>

              <Pressable
                onPress={() => handleDeleteTask(item.id)}
              >
                <Text style={styles.deleteButton}>Delete</Text>
              </Pressable>
            </View>
          </View>
        )}
      />

      <DatePicker
        testID="date-picker"
        modal
        open={!!selectedTaskId}
        date={selectedTask?.dueDate || new Date()}
        mode="datetime"
        onConfirm={handleConfirmDate}
        onCancel={handleCancelDate}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "row",
    marginBottom: 20,
    gap: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
  },
  addButton: {
    backgroundColor: "#007AFF",
    padding: 12,
    borderRadius: 5,
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  taskItem: {
    borderWidth: 1,
    borderColor: "lightgray",
    borderRadius: 5,
    padding: 15,
    marginBottom: 10,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  dateText: {
    color: "#666",
    marginBottom: 10,
  },
  actions: {
    flexDirection: "row",
    gap: 20,
  },
  editButton: {
    color: "#007AFF",
    fontWeight: "bold",
  },
  deleteButton: {
    color: "red",
    fontWeight: "bold",
  },
});

export default App;
