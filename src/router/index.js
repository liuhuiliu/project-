import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '../components/Login.vue'
import NoteBooks from '../components/NotebookList.vue'
import Note from '../components/Notedetail.vue'
import Trash from '../components/TrashDetail.vue'
Vue.use(Router)

const router = new Router({
    routes: [{
            path: '/',
            redirect: '/notebooks',
            component: NoteBooks
        },
        {
            path: '/login',
            component: Login
        },
        {
            path: '/notebooks',
            component: NoteBooks
        },
        {
            path: '/note/:noteId',
            component: Note
        },
        {
            path: '/trash/:noteId',
            component: Trash
        }
    ]
})

export default router;