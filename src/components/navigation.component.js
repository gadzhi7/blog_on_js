import {Component} from '../core/component'

export class NavigationComponent extends Component {
  constructor(id) {
    super(id)

    this.tabs = []
  }

  init() {
    this.$el.addEventListener('click', tabClickHundler.bind(this))
  }

  registerTabs(tabs) {
    this.tabs = tabs
  }


}

function tabClickHundler (e) {
  e.preventDefault()

  if(e.target.className.indexOf('tab') !== '-1' && e.target.className.indexOf('active') === -1 ) {
    //убираем у всех элементов класс active
    document.querySelectorAll('.tab').forEach(link => {
      link.classList.remove('active')
    })
    //добавляем активному табу класc active
    e.target.classList.add('active')
    // показываем активный таб
    const activeTab = this.tabs.find(tab => tab.name === e.target.dataset.name)
    this.tabs.forEach(tab => tab.component.hide())
    activeTab.component.show()

  }
}
