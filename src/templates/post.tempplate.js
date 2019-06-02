export function renderPosts(post, options) {
  let type = post.type === 'news' ?
  `<li class="tag tag-blue tag-rounded">Новость</li>` :
  `<li class="tag tag-rounded">Заметка</li>`

  let save = false;
  (JSON.parse(localStorage.getItem('favorites')) || []).forEach(i => {
    if(i.id === post.id) save = true
  })

  let button = save ?
  `<button class="button-round button-small button-danger" data-title="${post.title}" data-id="${post.id}">Удалить</button>` :
  `<button class="button-round button-small button-primary" data-title="${post.title}" data-id="${post.id}">Сохранить</button>`
  let showAllButton =  `<button class="button-round button-small button-primary show_all-js">Показать все</button>`

  return `
    ${options.withButton ? '' : showAllButton}
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
        ${options.withButton ? button : ''}
      </div>
    </div>
  `
}
