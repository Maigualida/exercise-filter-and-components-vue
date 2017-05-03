let app = new Vue({
	el: '#app',
	data: {
		filGender: {
			type: Boolean
		},
		nOp: "",
		vOcp: "",
		people: [],
	},

	created: function () {
		// fonction (hook) qui se grefe dès la création de l'instance
		let url = "https://randomuser.me/api/?results=100&nat=fr";

		// Requete en AJAX de typ)e GET derriere une URL
		this.$http.get(url).then(function (reponse) {
			app.people = reponse.body.results; // body: corps de ma réponse
			console.log(app.people);
		});

	},

	computed: {
		filterByImput: function () {
			let arr = this.people;

			console.log(this.filGender);

			//let arr = this.people.filter(function (elt) {
			// 	return elt.note >= app.note;
			// });


			if (this.filGender == true) {
				arr = this.people.filter(function (elt) {
					return elt.gender === 'female';
				});

			} else if (this.filGender == false) {
				arr = this.people.filter(function (elt) {
					return elt.gender === 'male';
				});
			} else {
				arr = this.people;
			}

			if (this.nOp.length > 0) {
				let regex = new RegExp(app.nOp, "i");
				arr = this.people.filter(function (elt) {
					return regex.test(elt.name.last) == true || regex.test(elt.name.first) == true;
				});
			}

			if (this.vOcp.length > 0) {
				let regex = new RegExp(app.vOcp, "i");
				arr = this.people.filter(function (elt) {
					return regex.test(elt.location.city) == true || regex.test(elt.location.postcode) == true;
				});
			}


			return arr;
		}

	},//end computed


	methods: {

		supprimer: function (person) {
			let position = this.people.indexOf(person);
			this.people.splice(position, 1);



		},
	},//end methods

	filters: {
		uPc: function (elt) {
			return elt[0].toUpperCase() + elt.substring(1, elt.length);
		},

		ageDate: function (elt) {
			let date = elt.substring(0, 4);
			return 2017 - date;
		}
	},//end filters


}) // fin new vue