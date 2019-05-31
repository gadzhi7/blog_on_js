import  {Component} from '../core/component'
import {apiService} from '../services/api.service'
import {TransformService} from '../services/transform.service'

export class PostsComponent extends Component {
  constructor(id, {loader}) {
    super(id)
    this.loader = loader
  }

  async onShow() {
    console.log(this.loader)
    this.loader.show()
    const fbData = await apiService.fetchPosts()
    const posts = TransformService.fbObjectToArray(fbData).reverse()
    const html = posts.map(post => renderPosts(post))
    this.$el.innerHTML = html
    this.loader.hide()
  }
}

function renderPosts(post) {
  let type = post.type === 'news' ?
  `<li class="tag tag-blue tag-rounded">Новость</li>` :
  `<li class="tag tag-rounded">Заметка</li>`

  let button = '<button class="button-round button-small button-primary">Сохранить</button>'
  return `
    <div class="panel">
      <div class="panel-head">
        <p class="panel-title">${post.title}</p>
        <ul class="tags">
          ${type}
        </ul>
      </div>
      <div class="panel-body">
        <p class="multi-line">${post.fulltext}</p>
      </div>
      <div class="panel-footer w-panel-footer">
        <small>${post.date} / ${post.time.slice(-5)}</small>
        ${button}
      </div>
    </div>
  `
}
