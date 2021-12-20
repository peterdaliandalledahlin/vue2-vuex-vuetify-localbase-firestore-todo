import Vue from 'vue'
import Vuex from 'vuex'
import Localbase from 'localbase'
import { initializeApp } from 'firebase/app'
import { getFirestore, getDocs, collection, deleteDoc, setDoc, onSnapshot, addDoc, doc, query, where, orderBy, serverTimestamp, updateDoc } from 'firebase/firestore'
//import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyAk-GpQFe7TaXqnN7q6qkL6CmqL-Ixaerg",
  authDomain: "vue-vuetify-vuefire-firebase.firebaseapp.com",
  projectId: "vue-vuetify-vuefire-firebase",
  storageBucket: "vue-vuetify-vuefire-firebase.appspot.com",
  messagingSenderId: "623048341265",
  appId: "1:623048341265:web:1264633a63081f79b23eb0"
}

initializeApp(firebaseConfig)

const database = getFirestore()
//const colRef = collection(database, 'todos')
//const q = query(colRef, orderBy('dueDate'))

let db = new Localbase('db')
db.config.debug = false

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    appTitle: process.env.VUE_APP_TITLE,
    search: null,
    tasks: [
      // { id: 1, done: false, title: 'Wake up', dueDate: '2021-12-12' },
      // { id: 2, done: false, title: 'Go to sleep', dueDate: '2021-12-15' },
      // { id: 3, done: false, title: 'Eat bananas', dueDate: '2021-12-24' },
      // { id: 4, done: false, title: 'Slip on bananas', dueDate: null },
    ],
    snackbar: {
      show: false,
      text: ''
    },
    sorting: false,
  },
  mutations: {
    setSearch(state, value) {
      state.search = value
    },
    addTask(state, newTask){
      state.tasks.push(newTask)
    },
    doneTask(state, id){
      let task = state.tasks.filter(task => task.id === id)[0]
      task.done = !task.done
    },
    deleteTask(state, id){
      state.tasks = state.tasks.filter(task => task.id !== id)
    },
    updateTaskTitle(state, payload) {
      let task = state.tasks.filter(task => task.id === payload.id)[0]
      task.title = payload.title
    },
    updateTaskDueDate(state, payload) {
      let task = state.tasks.filter(task => task.id === payload.id)[0]
      task.dueDate = payload.dueDate
    },
    setTasks(state, tasks) {
      state.tasks = tasks
    },
    hideSnackbar(state) {
      state.snackbar.show = false
    },
    showSnackbar(state, text) {
      let timeout = 0
      if(state.snackbar.show){
        state.snackbar.show = false
        timeout = 300
      }
      setTimeout(() => {
        state.snackbar.show = true
        state.snackbar.text = text
      }, timeout)
    },
    toggleSorting(state) {
      state.sorting = !state.sorting
    }
  },
  actions: {
    async addTask({ commit }, newTaskTitle) {
      let newTask = {
        title: newTaskTitle,
        done: false,
        dueDate: null
      }
      addDoc(collection(database, 'todos'), newTask)
      .then(() => {
        commit('addTask', newTask)
        commit('showSnackbar', 'Task added!')
      })
    },
    // addTask({ commit }, newTaskTitle) {
    //   let newTask = {
    //     id: Date.now(),
    //     title: newTaskTitle,
    //     done: false,
    //     dueDate: null
    //   }
    //   db.collection('tasks').add(newTask).then(() => {
    //     commit('addTask', newTask)
    //     commit('showSnackbar', 'Task added!')
    //   })
    // },
    doneTask({ state, commit }, id) {
      let task = state.tasks.filter(task => task.id === id)[0]
      updateDoc(doc(database, 'todos', id), {
        done: !task.done
      }).then(() => {
        commit('doneTask', id)
      })
    },
    // doneTask({ state, commit }, id) {
    //   let task = state.tasks.filter(task => task.id === id)[0]
    //   db.collection('tasks').doc({ id: id }).update({
    //     done: !task.done
    //   }).then(() => {
    //     commit('doneTask', id)
    //   })
    // },
    // REALTIME LISTENER FROM FIRESTORE
    async getTasks({ commit }) {
      let tasks = []
      onSnapshot(collection(database, 'todos'), (snapshot) => {
        snapshot.docs.forEach(doc => {
          tasks.push({ ...doc.data(), id: doc.id })
        })
      })
      commit('setTasks', tasks)
    },
    // GET TASKS FROM FIRESTORE
    // async getTasks({ commit }) {
    //   let tasks = []
    //   const querySnapshot = await getDocs(collection(database, "todos"))
    //   querySnapshot.forEach((doc) => {
    //     tasks.push({...doc.data(), id: doc.id})
    //   })
    //   commit('setTasks', tasks)
    // },
    // GET TASKS FROM LOCALBASE
    // getTasks({ commit }) {
    //   db.collection('tasks').get().then(tasks => {
    //     commit('setTasks', tasks)
    //   })
    // },
    // async setTasks({ commit }, tasks) {
    //   await addDoc(collection(database, 'todos'), {tasks})
    //     commit('setTasks', tasks)
    // },
    setTasks({ commit }, tasks) {
      db.collection('tasks').set(tasks)
        commit('setTasks', tasks)
    },
    async deleteTask({ commit }, id) {
      await deleteDoc(doc(database, "todos", id))
      commit('deleteTask', id)
      commit('showSnackbar', 'Task deleted!')
    },
    // deleteTask({ commit }, id) {
    //   db.collection('tasks').doc({ id: id }).delete().then(() => {
    //     commit('deleteTask', id)
    //     commit('showSnackbar', 'Task deleted!')
    //   })
    // },
    updateTaskTitle({ commit }, payload) {
      updateDoc(doc(database, 'todos', payload.id), {
        title: payload.title
      })
      .then(() => {
        commit('updateTaskTitle', payload)
        commit('showSnackbar', 'Task updated!')
      })
    },
    // updateTaskTitle({ commit }, payload) {
    //   db.collection('tasks').doc({ id: payload.id }).update({
    //     title: payload.title
    //   }).then(() => {
    //     commit('updateTaskTitle', payload)
    //     commit('showSnackbar', 'Task updated!')
    //   })
    // },
    updateTaskDueDate({ commit }, payload) {
      updateDoc(doc(database, 'todos', payload.id), {
        dueDate: payload.dueDate
      }).then(() => {
      commit('updateTaskDueDate', payload)
      commit('showSnackbar', 'Due date updated!')
      })
    },
    // updateTaskDueDate({ commit }, payload) {
    //   db.collection('tasks').doc({ id: payload.id }).update({
    //     dueDate: payload.dueDate
    //   }).then(() => {
    //   commit('updateTaskDueDate', payload)
    //   commit('showSnackbar', 'Due date updated!')
    //   })
    // }
  },
  getters: {
    tasksFiltered(state) {
      if(!state.search) {
        return state.tasks
      }
      return state.tasks.filter(task => task.title.toLowerCase().includes(state.search.toLowerCase()))
    }
  },
  modules: {
  }
})
