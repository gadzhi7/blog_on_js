import {Component} from '../core/component'

export class HeaderComponent extends Component {
  constructor(id) {
    super(id)
  }

  init() {
    if(localStorage.getItem('visited')) {
      this.hide()
    }
    document.querySelector('.js-header-start').addEventListener('click', startHundler.bind(this))
  }
}

function startHundler() {
  localStorage.setItem('visited', JSON.stringify(true))
  this.hide()
}
