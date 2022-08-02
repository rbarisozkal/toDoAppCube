<div id="widgetVueTemplate" style="margin: 20px;">
<van-divider
  :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }">
 <h2>Welcome to To Do App</h2>
</van-divider>
    <van-row>
        <van-col span="10">
            <van-field class="searchInput" v-model="searchItem" placeholder="Search a todo..."/>
        </van-col>
        <van-col span="6" offset="1">
            <van-button color="#4a79df" @click="searchToDo()">
                <van-icon name="search"/>
                Search</van-button>
        </van-col>
        <van-col span="6"  offset="1">
            <van-button color="#4a79df" @click="resetSearch()">
                <van-icon name="replay"/>
                Reset</van-button>
        </van-col>
    </van-row>
    <van-row :style="{marginTop: '20px' , marginBottom:'20px'}">
        <van-col>
            <van-button class="addButton" color="#4a79df" @click="showPopup">
                <van-icon name="plus"/> Add New Item
            </van-button>
        </van-col>
    </van-row>
    <van-popup :style="{padding:'40px', width:'70%'}" class="popup" v-model="showAdd" closeable="closeable" close-icon="close">
        <h3 class="header">Add New Item</h3>
        <van-divider :style="{ color: 'lightgray', borderColor: 'lightgray', paddingBottom : '20px'}"></van-divider>
        <van-row gutter="4">
            <van-field v-model="todoDefinition" name="todoDefinition" label="Add Definition" placeholder="..." :rules="[{ required: true, message: 'To Do Definition is required' }]"/>
        </van-row>
        <van-row gutter="4">
        <van-cell-group>
            <van-cell title="priority" label="Choose priority" />
            <van-rate v-model="priority" />
        </van-cell-group>
        </van-row>
        <van-row gutter="4">
            <van-cell is-link="is-link" @click="showDatePopup">{{dueDate}}</van-cell>
            <van-popup v-model="showDate"></van-popup>
        </van-row>
        <van-row>
            <van-col span="6">
                <van-field name="IsDone" label="Is Completed"></van-field>
            </van-col>
            <van-col span="4">
                <van-checkbox v-model="isCompleted" style="margin-top : 10px"></van-checkbox>
            </van-col>
        </van-row>
        <div style="margin: 16px;">
            <van-button v-if="showAdd" round="round" block="block" type="info" @click="addToDo" native-type="submit">
                Submit
            </van-button>
        </div>
    </van-popup>
    <van-popup class="popup" v-model="showDate" position="bottom" :style="{ height: '50%', width: '100%' }">
        <van-datetime-picker
            v-model="currentDate"
            type="datetime"
            title="Choose DateTime"
            :min-date="minDate"
            :max-date="maxDate"
            @confirm="confirm"
        />
    </van-popup>


    <van-row>
        <van-list  finished-text="Finished">
            <van-row class="tableTitles" type="flex" justify="space-between" :style="{marginTop: '10px'}">
                <van-col offset="3">
                    <p>To Do Info</p>
                </van-col>
                <van-col span="8">
                    <p>Operation</p>
                </van-col>
            </van-row>
            <van-divider :style="{ color: '#000000', borderColor: '#000000', paddingBottom : '10px',marginTop: '15px'}"></van-divider>

            <van-row class="list" gutter="20" type="flex" justify="space-between" style="backgroundColor :pink">
                <van-cell v-for="todo in todoList" :key="todo">
                    <van-col span="14">
                        <h3>
                            {{todo.ACC__todoDefinition__CST}}
                        </h3>
                        <p>
                            {{todo.ACC__dueDate__CST}}
                        </p>
                        <p>
                           Importance level : {{todo.ACC__priority__CST}}
                        </p>
                        <p>
                            {{todo.ACC__isCompleted__CST ? "Completed" : "Not completed"}}
                        </p>

                    </van-col>
                    <van-col class="operation" span="10">
                        <van-button color="#4a79df" @click="showEditPopup(todo)">
                            <van-icon name="edit"/>
                        </van-button>
                        <van-button color="#ff4c4c" @click="showDeletePopup(todo.id)">
                            <van-icon name="delete"/>
                        </van-button>
                    </van-col>
                </van-cell>
            </van-row>
        </van-list>
    </van-row>

    <van-popup class="popup" v-model="showDelete" closeable="false" close-icon="close" position="center" :style="{ height: '40%', width: '80%' }">
        <h3 class="deleteMessage">  
            Are you sure you want to delete?
        </h3>
        <van-row>
            <van-col offset="5" span="7">
                <van-button type="default" @click="cancelDeleteToDo()" native-type="submit">
                    Cancel
                </van-button>
            </van-col>
            <van-col>
                <van-button type="danger" @click.prevent="deleteToDo()" native-type="submit">
                    Delete
                </van-button>
            </van-col>
        </van-row>
    </van-popup>

    <van-popup :style="{padding:'40px', width:'70%'}" class="popup" v-model="showEdit" closeable="closeable" close-icon="close">
        <h3 class="header">Update Item</h3>
        <van-divider :style="{ color: 'lightgray', borderColor: 'lightgray', paddingBottom : '20px'}"></van-divider>
        <van-row gutter="4">
            <van-field v-model="todoDefinition" name="todoDefinition" label="Edit Definition" placeholder="..." :rules="[{ required: true, message: 'To Do Definition is required' }]"/>
        </van-row>
        <van-row gutter="4">
        <van-cell-group>
            <van-cell title="priority" label="Edit priority" />
            <van-rate v-model="priority" />
        </van-cell-group>
        </van-row>
        <van-row gutter="4">
            <van-cell is-link="is-link" @click="showDatePopup">{{dueDate}}</van-cell>
            <van-popup v-model="showDate"></van-popup>
        </van-row>
        <van-row>
            <van-col span="6">
                <van-field name="IsDone" label="Is Completed"></van-field>
            </van-col>
            <van-col span="4">
                <van-checkbox v-model="isCompleted" style="margin-top : 10px"></van-checkbox>
            </van-col>
        </van-row>
        <div style="margin: 16px;">
            <van-button round="round" block="block" type="info" @click="updateItem" native-type="submit">
                Update
            </van-button>
        </div>
    </van-popup>
</div>