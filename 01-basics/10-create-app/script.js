import { defineComponent, createApp } from 'vue'

 const App = defineComponent({
    name: 'App',
    setup () {
        function formatDate() {
            return 'Сегодня ' + (new Intl.DateTimeFormat("en", {dateStyle: "long"}).format(new Date()))
        }
        return {
            formatDate,
        }
    },
     
    template: '<div>{{formatDate()}}</div>',
 })

createApp(App).mount('#app')