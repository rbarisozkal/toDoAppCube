var todoBarisWidget = StudioWidgetWrapper.extend({
  /*
   * Triggered when initializing a widget and will have the code that invokes rendering of the widget
   * setParentContainer(JQueryParentContainerDOM) - binds event to this container
   * setItemContainer(JQueryItemContainerDOM) - binds studio item events for respective item containers
   * bindEvents() - binds the studio event to this widget
   */
  init: function () {
    var thisObj = this;
    thisObj._super.apply(thisObj, arguments);
    thisObj.render();
    if (typeof Studio != "undefined" && Studio) {
    }
  },

  /*
   * Triggered from init method and is used to render the widget
   */
  render: function () {
    var thisObj = this;
    var widgetProperties = thisObj.getProperties();
    var elem = thisObj.getContainer();
    var items = thisObj.getItems();
    var connectorProperties = thisObj.getConnectorProperties();

    /*
     * API to get base path of your uploaded widget API file
     */
    var widgetBasePath = thisObj.getWidgetBasePath();
    if (elem) {
      var containerDiv = $(".scfClientRenderedContainer", elem);
      if (containerDiv.length) {
        $(containerDiv).empty();
      } else {
        containerDiv = document.createElement("div");
        containerDiv.className = "scfClientRenderedContainer";
        $(elem).append(containerDiv);
      }

      var vm = new Vue({
        el: $("#widgetVueTemplate", elem)[0],
        data: {
          name: "ToDoBarisApp",
          todoDefinition: "",
          password: "",
          id: "",
          showDelete: false,
          minDate: new Date(2020, 0, 1),
          maxDate: new Date(2025, 10, 1),
          dueDate: this.currentDate,
          currentDate: new Date(2021, 0, 17),
          priority: 3,
          showDate: false,
          isCompleted: false,
          searchItem: "",
          todoList: [],
          finished: false,
          showAdd: false,
          chosenPriority: "",
          showEdit: false,
        },
        async created() {
          this.getAllTodos(this.searchItem);
        },
        methods: {
          async addToDo() {
            let newItem = {
              id:
                new Date().getFullYear().toString() +
                "" +
                new Date().getHours().toString() +
                "" +
                new Date().getMilliseconds().toString() +
                "" +
                new Date().getMinutes().toString(),
              todoDefinition: this.todoDefinition,
              priority: this.priority,
              dueDate: this.currentDate,
              isCompleted: this.isCompleted,
            };
            const request = {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(newItem),
            };
            let res = await fetch(
              "/service/ACC__todoTestBaris/0.1.0/createToDoDefinition",
              request
            );
            console.log(res);
            const resJson = await res.json();
            console.log(resJson);
            this.getAllTodos("");
            this.todoDefinition = "";
            this.priority = "";
            (this.isCompleted = ""), (this.currentDate = "");
            this.showAdd = false;
          },
          async resetSearch() {
            this.searchItem = "";
            await this.getAllTodos(this.searchItem);
          },
          async getAllTodos(searchItem) {
            const options = {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            };
            let resp = await fetch(
              `/service/ACC__todoTestBaris/0.1.0/listToDos?todoDefinition=${searchItem}`,
              options
            );

            resp = await resp.json();

            if (resp.resCode !== "0") {
              throw resp;
            }
            this.todoList = [...resp.result.todos];
            this.todoList.sort((a, b) => {
              return (
                parseFloat(b.ACC__priority__CST) -
                parseFloat(a.ACC__priority__CST)
              );
            });
          },
          async searchToDo() {
            await this.getAllTodos(this.searchItem);
          },
          async deleteToDo(id) {
            id = this.id;
            console.log("open delete todo item id " + id);

            let data = {
              id: id,
            };
            const request = {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data),
            };

            let res = await fetch(
              `/service/ACC__todoTestBaris/0.1.0/deleteToDo?=${id}`,
              request
            );
            console.log(res);
            const resJson = await res.json();
            console.log(resJson);
            this.showDelete = false;
            this.getAllTodos("");
          },
          async updateItem() {
            let editTask = {
              dueDate: this.dueDate,
              id: this.id,
              isCompleted: this.isCompleted,
              priority: this.priority,
              todoDefinition: this.todoDefinition,
            };
            console.log(this.dueDate);
            let request = {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(editTask),
            };
            let res = await fetch(
              `/service/ACC__todoTestBaris/0.1.0/updateToDo`,
              request
            );
            console.log(res);
            const resJson = await res.json();
            console.log(resJson);
            this.showEdit = false;
            this.getAllTodos("");
          },
          updateToDoItem(id) {
            console.log(id);
            this.id = id;
          },
          showDeletePopup(id) {
            this.showDelete = true;
            this.id = id;
          },
          cancelDeleteToDo() {
            this.showDelete = false;
          },
          showPopup() {
            this.todoDefinition = "";
            (this.priority = ""),
              (this.isCompleted = false),
              (this.currentDate = "");
            this.showAdd = true;
          },
          confirm() {
            this.showDate = false;
            this.dueDate = this.currentDate;
          },
          showDatePopup() {
            this.showDate = true;
          },
          onChangePriority(value) {
            console.log(value);
          },
          showEditPopup(todo) {
            this.todoDefinition = todo.ACC__todoDefinition__CST;
            this.priority = todo.ACC__priority__CST;
            this.isCompleted = todo.ACC__isCompleted__CST;
            this.currentDate = todo.ACC__dueDate__CST;
            this.id = todo.id;
            this.showEdit = true;
          },
        },
      });
    }

    /*
     * API to refresh the previously bound events when a resize or orientation change occurs.
     *  thisObj.sksRefreshEvents(ItemIdx);
     * ItemIdx (Optional) - To refresh events for a specific item. Default value is 0.
     */
    $(window).resize(function () {
      thisObj.sksRefreshEvents();
    });
  },
});
