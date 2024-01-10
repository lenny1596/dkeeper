import Text "mo:base/Text";
import List "mo:base/List";
import Debug "mo:base/Debug";


// created actor canister Dkeeper
actor DKeeper {
  public type Note = {
    title: Text;
    content: Text;
  };

  /* List is a type of data structure  in motoko, 
  List.List<typeOfData>, List.nil means an empty array of type Note */
  var notes: List.List<Note> = List.nil<Note>();

  // method to store new data with type
  public func createNote(titleText: Text, contentText: Text) {
    let newNote: Note = {
      title = titleText;
      content = contentText;
    };

    // pushing(prepend) it to notes List
    notes := List.push(newNote, notes);
    Debug.print(debug_show(notes));
  };
  
  // method to read to List data converted as array.
  public query func readNote(): async [Note] {
    return List.toArray(notes)
  };
}