import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  Alert,
} from 'react-native';
import Input from './components/Input';
import TodoList from './components/TodoList';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');
  const activeTodos = todos.filter(todo => !todo.isDone);

  const renderTodo = ({item}) => (
    <TodoList todos={item} isDone={isDone} deleteTodo={deleteTodo} />
  );

  const addTodo = () => {
    console.log('addTodo : ' + text);

    setTodos([
      ...todos,
      {
        id: Date.now() + Math.random(),
        name: text,
        isDone: false,
      },
    ]);

    setText('');
  };

  const isDone = id => {
    const newTodoList = todos.map(todo => {
      if (todo.id === id) {
        todo.isDone = !todo.isDone;
      }
      return todo;
    });
    setTodos(newTodoList);
  };

  const deleteTodo = id => {
    Alert.alert('Silme işlemi', 'Kaldırmaktan emin misin?', [
      {
        text: 'İptal',
        onPress: () => console.log('iptal edildi'),
      },
      {
        text: 'Sil',
        onPress: () => {
          const newTodoList = todos.filter(todo => todo.id !== id);
          setTodos(newTodoList);
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header_container}>
        <Text style={styles.title}>Yapılacaklar</Text>
        <Text style={styles.title}>{activeTodos.length}</Text>
      </View>
      <View style={styles.innerContainer}>
        <FlatList data={todos} renderItem={renderTodo} />
      </View>
      <Input text={text} setText={setText} addTodo={addTodo} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#102027',
    padding: 20,
    justifyContent: 'space-between',
  },
  innerContainer: {
    flex: 1,
    marginTop: 10,
  },
  header_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 30,
    color: '#ffa500',
  },
});

export default App;
