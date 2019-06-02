import  {Component} from '../core/component'
import {apiService} from '../services/api.service'
import {TransformService} from '../services/transform.service'
import {renderPosts} from '../templates/post.tempplate'

export class PostsComponent extends Component {
  constructor(id, {loader}) {
    super(id)
    this.loader = loader
  }

  init() {
    this.$el.addEventListener('click', buttonHundler.bind(this))
  }

  async onShow() {
    this.loader.show()
    const fbData = await apiService.fetchPosts()
    const posts = TransformService.fbObjectToArray(fbData).reverse()
    const html = posts.map(post => renderPosts(post, {withButton: true}))
    this.$el.innerHTML = html
    this.loader.hide()
  }
}

function buttonHundler(e) {
  const $el = e.target
  const id = $el.dataset.id

  if(id) {
    const title = $el.dataset.title
    let favorites = JSON.parse(localStorage.getItem('favorites')) || []
    let saveItem = {id, title}
    let save = false
    favorites.forEach(i => {
      if(i.id === id) save = true
    })

    if(save) {
      $el.textContent = 'Сохранить'
      $el.classList.remove('button-danger')
      $el.classList.add('button-primary')
      favorites = favorites.filter(fId => fId.id !== id)
    } else {
      $el.classList.remove('button-primary')
      $el.classList.add('button-danger')
      $el.textContent = 'Удалить'
      favorites.push(saveItem)
    }

    localStorage.setItem('favorites', JSON.stringify(favorites))
  }
}
