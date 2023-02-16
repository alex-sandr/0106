class CommentController {
  static generateTodoItemHtml({fullname, date, comment}) {
    return CommentController.commentTemplate
        .replaceAll('{{fullname}}', fullname)
        .replaceAll('{{date}}', date)
        .replaceAll('{{comment}}', comment);
  }

  static commentTemplate =
    '       <li class="comments__item">' +
    '          <div class="comment">' +
    '            <div class="comment__author">' +
    '            <span class="comment__fullname">' +
    '             {{fullname}}' +
    '            </span>' +
    '              <time datetime="{{date}}" class="comment__time">{{date}}</time>' +
    '            </div>' +
    '            <div class="comment__text">' +
    '             {{comment}}' +
    '            </div>' +
    '          </div>' +
    '        </li>';


  constructor({form, commentsList}) {
    this.form = form;
    this.commentsList = commentsList;
    this.#init();
  }


  #init() {
    this.form.addEventListener('submit', (event) => {
      event.preventDefault();
      this.createComment(this.#getFormData()).then(() => {
        this.#resetForm();
      });
    });


    document.addEventListener('keydown', (event) => {
      if (event.ctrlKey && event.key === 'Enter') {
        this.createComment(this.#getFormData()).then(() => {
          this.#resetForm();
        });
      }
    });
  }

  #resetForm() {
    this.form.reset();
  }

  #getFormData() {
    return {
      fullname: 'Eva Jonson',
      date: new Date().toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }),
      comment: this.form.elements.comment.value,
    };
  }

  setLoader(isLoading) {
    const body = document.querySelector('body');
    if (isLoading) {
      body.style.opacity = '0.5';
    } else {
      body.style.opacity = '1';
    }
  }

  createComment(data) {
    // simulate a request to the server
    this.setLoader(true);
    const promise = new Promise((resolve) => {
      setTimeout(() => {
        resolve({});
      }, 200);
    });
    return promise.then(() => {
      this.appendComment(CommentController.generateTodoItemHtml(data));
      this.setLoader(false);
    });
  }

  appendComment(template) {
    this.commentsList.insertAdjacentHTML('beforeend', template);
  }
}

new CommentController({
  form: document.querySelector('#comment-form'),
  commentsList: document.querySelector('.comments__list'),
});
