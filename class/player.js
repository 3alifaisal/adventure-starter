const { Food } = require("./food");
const { Room } = require("./room");

class Player {

    constructor(name, startingRoom) {
        this.name = name;
        this.currentRoom = startingRoom;
        this.items = [];
    }

    move(direction) {

        const nextRoom = this.currentRoom.getRoomInDirection(direction);

        // If the next room is valid, set the player to be in that room
        if (nextRoom) {
            this.currentRoom = nextRoom;

            nextRoom.printRoom(this);
        } else {
            console.log("You cannot move in that direction");
        }
    }

    printInventory() {
        if (this.items.length === 0) {
            console.log(`${this.name} is not carrying anything.`);
        } else {
            console.log(`${this.name} is carrying:`);
            for (let i = 0 ; i < this.items.length ; i++) {
                console.log(`  ${this.items[i].name}`);
            }
        }
    }

   
        takeItem(itemName) {
            if (this.currentRoom instanceof Room) {
                // Check if the current room is an instance of the Room class

                // Find the index of the item by its name in the room's items array
                const itemIndex = this.currentRoom.items.findIndex(item => item.name === itemName);

                if (itemIndex !== -1) {
                    // If the item is found in the room, remove it from the room's items array
                    const removedItem = this.currentRoom.items.splice(itemIndex, 1)[0];

                    // Add the removed item to the player's items array
                    this.items.push(removedItem);

                    
                } else {
                    console.log(`${itemName} not found in the room`);
                }
            } else {
                console.log("Player is not in a valid room");
            }
        }

    

    dropItem(itemName) {
        let itemIndex = -1;
        if(this.currentRoom instanceof Room){
            for(let i =0; i <this.items.length;i++){
                let item = this.items[i];
                if(item.name === itemName){
                    itemIndex = i;
                }  
            }
            if(itemIndex !== -1){
                const removedItem = this.items.splice(itemIndex,1)[0];
                this.currentRoom.items.push(removedItem);
            }
            else{
                console.log(`${itemName} not found in the room`);
            }
            
        }
        // Fill this in
    }

    eatItem(itemName) {
        for(let i = 0; i < this.items.length; i++){
            let item = this.items[i];
            if(item instanceof Food){
                if(item.name === itemName){
                    this.items.splice(i,1);
                }
            }
        
           
        }
        return -1;
    }
    

    getItemByName(name) {
        let item = "not Found";
        for(let i = 0; i < this.items.length; i++){
            if(this.items[i].name === name){
                item = this.items[i];
                break;
            }
        }
        return item;
    }
}

module.exports = {
  Player,
};
