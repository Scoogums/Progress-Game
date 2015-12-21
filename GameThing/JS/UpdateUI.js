/**
 * Created by scoogumss on 24/11/2015.
 */

// Code for the progress bar in the middle of the screen. Currently does nothing but
// loop infinitely as it was primarily a test to see if it would work.
var progressBar = function () {
    var bar = $('#progressTest');
    var barValue = bar.val();
    if (barValue == 100) {
        $('#progressTest').val(0);
    }
    barValue = bar.val();
    barValue += 5
    $('#progressTest').val(barValue);
}

// Updates player healthbar visual display. Runs during updateHtmlElements which
// will usually run after anything changes, so health should be updated whenever
// the player takes damage.
var healthBarUpdate = function () {
    $('#healthBar').attr('max',player.maxHealth);
    $('#healthBar').val(player.currentHealth);
}

// Iterates through the gameText array to display the current stored values.
var displayGameText = function(){
    for (var x = 0;x<gameText.length;x++) {
        $('#gameText').append(gameText[x]);
    }
};

// Clears the game text. This is run whenever updateGameText is run. If it didn't,
// text would infinitely fill up the screen. If the game text was displayed by using
// static html elements this wouldn't be needed, but then the option to dynamically
// change how much text is on the screen wouldn't exist either.
var clearGameText = function() {
    $('#gameText').empty();
};

// Updates HTML elements on the screen. Maybe at some point change it to only update
// any value that actually needs changing.
var updateHtmlElements = function() {
    healthBarUpdate();
    $('#name').html("Name: " + player.name);
    $('#level').html("Level: " + player.level);
    $('#gold').html("Gold: " + player.gold);
    $('#health').html("Health: " + player.currentHealth + "/" + player.maxHealth);
    $('#damage').html("Damage: " + player.minDamage + "-" + player.maxDamage);
    $('#armor').html("Armor: " + player.armor);
    $('#terminal').css('font-family', 'sans-serif');
    clearLists();
    shopPopulateList();
    for (var x = 0;x<playerEquipped.length;x++) {
        var equippedListItem = document.createElement("option");
        equippedListItem.text = "[" + playerEquipped[x].name + "] [" + playerEquipped[0].minDamage + "-" + playerEquipped[0].maxDamage + "] [" + playerEquipped[0].rarity.charAt(0) + "]";
        equippedListItem.value = x;
        $("#equippedList")[0].add(equippedListItem);
    }
    for (var x = 0;x<playerInventory.length;x++) {
        var inventoryListItem = document.createElement("option");
        if (playerInventory[x].rarity == "Unique") {
            inventoryListItem.text = "[" + playerInventory[x].name + "]" + " [" + playerInventory[x].minDamage + "-" + playerInventory[x].maxDamage + "] [Unique] [G:" + playerInventory[x].goldValue + "]";
        } else {
            inventoryListItem.text = "[" + playerInventory[x].name + "]" + " [" + playerInventory[x].minDamage + "-" + playerInventory[x].maxDamage + "] [" + playerInventory[x].rarity.charAt(0) + "] [G:" + playerInventory[x].goldValue + "]";
        }
        inventoryListItem.value = x;
        $("#inventoryList")[0].add(inventoryListItem);
    }
};

function clearLists()
{
    for(var x=$("#inventoryList")[0].options.length-1;x>=0;x--)
    {
        $("#inventoryList")[0].remove(x);
    }
    for(var x=$("#equippedList")[0].options.length-1;x>=0;x--)
    {
        $("#equippedList")[0].remove(x);
    }
    for(var x=$("#shopList")[0].options.length-1;x>=0;x--)
    {
        $("#shopList")[0].remove(x);
    }
};


// Updates the gametext. It runs backwards through the gameText array and overwrites
// each value with the one ahead of it. This gives the appearance of scrolling text.
var updateGameText = function(newString) {
    clearGameText();
    var stringHolder = newString + "<br/>";
    var stringHolderTwo = gameText[10];
    for (var x = gameText.length - 1;x>-1;x--) {
        stringHolderTwo = gameText[x];
        gameText[x] = stringHolder;
        stringHolder = stringHolderTwo;
    }
    displayGameText();
};

// Takes in a string of text, colours it, and returns it. It can take in numbers or
// Strings since it runs a toString() method. The colour value can also be either
// text or hexidecimal.
var colourText = function (string, colour) {
    var textToColour = string.toString();
    var result = textToColour.fontcolor (colour);
    return result
};