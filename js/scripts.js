
const state = {userList: []};
const uniqueId = Date.now().toString(36) + Math.random().toString(36).substring(2); //Benzersiz ID oluşturuluyor.

      function Li(list, subscriber) {
        list.forEach(function (item) {
			const newLi = document.createElement("li");
			(newLi.innerHTML = item.fullName + " <span>$" + item.balance+ "</span>"), newLi.setAttribute("data-id", item.id);
			subscriber.appendChild(newLi);
        });
      }

      function Option(list, subscriber) {
		if (subscriber.getAttribute("id") === "from") {
			defaultOption = "Select From" //Gönderen selectbox'a "Select from" ekleniyor.
		} else if (subscriber.getAttribute("id") === "to") {
			defaultOption = "Select To" //Alıcı selectbox'a "Select To" ekleniyor.
		}
			const newOption = document.createElement("option");
			(newOption.innerText = defaultOption), newOption.setAttribute("value", '');
			subscriber.appendChild(newOption);
        list.forEach(function (item) {
          const newOption = document.createElement("option");
          (newOption.innerText = item.fullName), newOption.setAttribute("value", item.id);
          subscriber.appendChild(newOption);
        });
      }

      function renderUserList() {
        const subscribers = [document.getElementById("account-list"), document.getElementById("from"), document.getElementById("to")];
        subscribers.forEach(function (subscriber) {
          subscriber.innerHTML = "";
          if (subscriber.getAttribute("id") === "account-list") {
            Li(state.userList, subscriber);
          } else {
            Option(state.userList, subscriber);
          }
        });
      }
      function setState(stateName, newValue) {
        state[stateName] = newValue;
        renderUserList();
      }
	  
      function addAccount() {
        const fullName = document.getElementById("fullname")
        const balance = document.getElementById("balance")
		const addAccountform = document.getElementById("addAccountform")
		if (addAccountform.checkValidity()) {
        setState("userList", [...state.userList,
          {
            fullName: fullName.value,
            balance: balance.value,
            id: uniqueId,
          },
        ]);
		document.getElementById("history-log").innerHTML = `<li><small><span class=\'badge bg-info\'>${new Date().toLocaleString()}</span> <span>${fullName.value} Account a added with <span class=\"badge bg-danger\">$${balance.value}</span> balance</small></li>` + document.getElementById('history-log').innerHTML;
		addAccountform.reset(); //form temizleniyor
		event.preventDefault(); //Validasyon uyarısı kaldırılıyor.
		addAccountform.classList.remove("was-validated"); //validasyon uyarısı kaldırılıyor.
		}
	  }
	  
	  function checkFromTo() {
	  // Para transferi seçiminde gönderenin alıcı kısmından silinmesi için
		const whyFrom = document.getElementById("from") //gönderen elementi değişkene atanıyor
		const whyTo = document.getElementById("to") //alıcı elementi değişkene atanıyor
		whyTo.innerHTML ='' // alıcı elementinin içi boşaltılıyor.
		Option(state.userList, whyTo) // alıcı elementinin içine state.userList tekrar ekleniyor.
        whyFrom.selectedIndex !== 0 ? whyTo.remove(whyFrom.selectedIndex) : ""  // Select From değil ise Gönderen'de seçilen kayıt Alıcı'dan kaldırılıyor.
      }