import  {Component} from '../core/component'
import {apiService} from '../services/api.service'
import {renderPost} from '../templates/post.tempplate'

export class FavoriteComponent extends Component {
  constructor(id, options) {
    super(id)
    this.loader = options.loader
  }

  onShow() {
    const favorites = JSON.parse(localStorage.getItem('favorites'))
    const html = renderList(favorites)
    this.$el.innerHTML = html
  }

  init() {
    this.$el.addEventListener('click', linkClickHandler.bind(this))
  }

  onHide() {
    this.$el.innerHTML = ''
  }

}

async function linkClickHandler(e) {
  e.preventDefault()
  this.loader.show()
  const postId = e.target.dataset.id
  const post = await apiService.fetchPostById(postId)
  this.$el.innerHTML = renderPosts(post, {withButton: false})
  this.loader.hide()
}

function renderList(list = []) {
  if(list.length) {
    return `
      <ul>
        ${list.map(item => `<li><a href="#" class="favorite-link" data-id="${item}">${item}</a></li>`).join(' ')}
      </ul>
    `
  }
  return `<p class="center">В избранных пока пусто.</p>`
}
