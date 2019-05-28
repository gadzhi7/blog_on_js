import {Component} from '../core/component'

export class NavigationComponent extends Component {
  constructor(id) {
    super(id)

  }

  init() {
    this.$el.addEventListener('click', tabClickHundler.bind(this))
  }
}

function tabClickHundler (e) {
  e.preventDefault()

  if(e.target.className.indexOf('tab') !== '-1' && e.target.className.indexOf('active') === -1 ) {

    document.querySelectorAll('.tab').forEach(link => {
      link.classList.remove('active')
    })

    e.target.classList.add('active')
  }
}
