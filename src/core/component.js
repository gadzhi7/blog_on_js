export class Component {
  constructor(id) {
    this.$el = document.querySelector('#' + id)
    this.init()
  }

  init() {}

  onShow() {

  }

  onHide() {

  }

  show() {
    this.$el.classList.remove('hide')
    this.onShow()
  }

  hide() {
    this.$el.classList.add('hide')
    this.onHide()
  }

}
