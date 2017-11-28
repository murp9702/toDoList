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
      }
    ],
  },
  methods: {
    postSubmit(event) {
      event.preventDefault();
      var NewNote = function(text) {
        this.text = text;
        this.complete = false;
      }
      console.log(mainVM.currentText)
      var createNote = new NewNote(mainVM.currentText)
      mainVM.notes.push(createNote)
      mainVM.currentText = '';
      console.log(`submit ${createNote}`)
      $.post('/submit', createNote, function(data) {
        console.log("-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-")
        console.log(data)
        console.log("-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-")
      })
    },
    postComplete(note) {
      var note = note
      console.log(`strike ${note}`)
      note.complete = !note.complete
      $.post('/complete', note, function(data) {
        console.log("-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-")
        console.log(data)
        console.log("-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-")
      })
    },
    strikeThrough(note) {

    },


    postDelete(note, index) {
      console.log(`delete ${note}`)
      $.post('/delete', note, function(data) {
        console.log("-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-")
        console.log(data)
        console.log("-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-")
      })
      event.preventDefault();
      console.log(index)
      this.notes.splice(index, 1);
    }
  },
  mounted() {
    var vm = this
    $.get("/getData", function(res, notes) {
      console.log(res)

      vm.notes = res
    })

  }
})
