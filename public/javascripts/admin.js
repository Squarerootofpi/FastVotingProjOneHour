var admin = new Vue({
    el: '#admin',
    data: {
      title: "",
      file: null,
      personBio: "",
      addItem: null, //This is the item that was just added.
      candidates: [],
      findTitle: "",
      findItem: null,
      isLoaded: false,
    },
    computed: {
      suggestions() {
        console.log("In suggestions computed");
        console.log(this.candidates);
        console.log("in created computed crap");
      //console.log(this.candidates.title);
        return this.candidates.filter(item => item.title.toLowerCase().startsWith(this.findTitle.toLowerCase()));
      }
    },
    created() {
      console.log("in created");
      this.getcandidates();
      console.log(this.candidates);
    },
    methods: {
      fileChanged(event) {
        this.file = event.target.files[0]
      },
      async upload() {
        try {
          //const formData = new FormData();
          console.log("Description:" + this.personBio);
          //formData.append('photo', this.file, this.file.title)
          //let r1 = await axios.post('/api/photos', formData);
          let r2 = await axios.post('/candidates', {
            title: this.title,
            //path: r1.data.path,
            bio: this.personBio,
          });
          this.addItem = r2.data;
        } catch (error) {
          console.log(error);
        }
      },
      selectItem(item) {
        console.log("Selecting item: " + item.title);
        this.findTitle = "";
        this.findItem = item;
      },
      async getcandidates() {
        console.log("in getcandidates");
        try {
          let response = await axios.get("/candidates");
          console.log(response);
          this.candidates = response.data;
  
          console.log(response.data);
          console.log(response.data + " is the data sent back");
          console.log(this.candidates + "is the candidates saved");
          return true;
        } catch (error) {
          console.log(error);
        }
      },
      async deleteItem(item) {
        try {
          console.log("in deleteItem");
          let response = await axios.delete("/candidates/" + item._id);
          this.findItem = null;
          this.getcandidates(); //Getcandidates gets new stuff....
          return true;
        } catch (error) {
          console.log(error);
        }
      },
      async editItem(givenItem) {
        try {
          let response = await axios.put('/candidates/' + givenItem._id, {title: this.findItem.title, description: this.findItem.description});
          console.log(this.findItem.title);
          console.log(this.findItem.description);
          this.findItem = null;
          this.getcandidates();
          return true;
        }
        catch (error) 
        {
          console.log(error);
        }
      },
    },
  });
  