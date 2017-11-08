var mainVM = new Vue({
  el: '#app',
  data: {
    currentText: '',
    notes: [{
      text: 'string',
      complete: false,
    },
    {
      text: "string2",
      complete: false,
    }],
  },
  methods: {
    postSubmit(event) {
      event.preventDefault();
      var NewNote = function(text){
        this.text = text;
        this.complete = false;
      }
      console.log(mainVM.currentText)
      var createNote = new NewNote(mainVM.currentText)
      mainVM.notes.push(createNote)
      mainVM.currentText = '';
      console.log(`submit ${createNote.text}`)
      $.post('/submit', createNote, function(data){
        console.log("-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-")
        console.log(data)
        console.log("-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-")
      })
    },
    postComplete(event) {
      event.preventDefault();
      $.post('/complete', mainVM.notes, function(data){
        console.log("-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-")
        console.log(data)
        console.log("-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-")
      })
    },
    strikeThrough(note) {
      var note = note
      console.log(`strike ${note}`)
      note.complete = !note.complete
      $.post('/submit', note, function(data){
        console.log("-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-")
        console.log(data)
        console.log("-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-")
      })
    },


    postDelete(event) {
      event.preventDefault();
    }
  }
})
