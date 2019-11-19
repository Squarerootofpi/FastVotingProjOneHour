/*global axios */
/*global Vue */
var app = new Vue({
    el: '#app',
    data: {
        candidates: [
            // { title: 'candidate 1', upvotes: 5 },
            // { title: 'candidate 2', upvotes: 6 },
            // { title: 'candidate 3', upvotes: 1 },
            // { title: 'candidate 4', upvotes: 4 },
            // { title: 'candidate 5', upvotes: 3 }
        ],
        test: "Hello World",
        newcandidate: "",
    },
    created: function () {
        this.getall();
    },
    computed: {
        sortedcandidates() {
            return this.candidates.sort((a, b) => {
                var rval = 0;
                if (a.upvotes < b.upvotes) {
                    rval = 1;
                } else if (a.upvotes > b.upvotes) {
                    rval = -1;
                }
                return (rval);
            })
        }

    },
    methods: {
        addcandidate() {
            var url = "http://cs.creatorof.jsearch.org:4200/candidates";
            axios.post(url, {
                title: this.newcandidate,
                upvotes: 0
            })
                .then(response => {
                    console.log("Post Response ");
                    console.log(response.data);
                    this.candidates.push(response.data);
                })
                .catch(e => {
                    console.log(e);
                });
            console.log(this.candidates);
            this.newcandidate = "";
        },
        vote() {
            
        },
        incrementUpvotes(item) {
            var url = "http://cs.creatorof.jsearch.org:4200/candidates/" + item._id + "/upvote";
            axios.put(url)
                .then(response => {
                    console.log(response.data.upvotes);
                    item.upvotes = response.data.upvotes;
                })
                .catch(e => {
                    console.log(e);
                });
            console.log("URL " + url);
        },
        async getall() {
            console.log("get all");
            var url = "http://cs.creatorof.jsearch.org:4200/candidates"; // This is the route we set up in index.js
            try {
                let response = await axios.get(url);
                this.candidates = response.data; // Assign array to returned response
                console.log(this.candidates);
                return true;
            }
            catch (error) {
                console.log(error);
            }
        },
    }
});