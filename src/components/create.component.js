import  {Component} from '../core/component'
import {Form} from '../core/form'
import {Validators} from '../core/validators'
import {apiService} from '../services/api.service'

export class CreateComponent extends Component {
  constructor(id) {
    super(id)
  }

  init() {
    this.$el.addEventListener('submit', submitHundler.bind(this))

    this.form = new Form (this.$el, {
      title: [Validators.required, Validators.minLength(3)],
      fulltext: [Validators.required, Validators.minLength(10)]
    })
  }
}

async function submitHundler(e) {
  e.preventDefault()

  if(this.form.isValid()) {
    const formData = {
      type: this.$el.type.value,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
      ...this.form.value()
    }

    await apiService.createPost(formData)
    this.form.clear()
    console.log('Запись создана в базе данных.')
  }

}
