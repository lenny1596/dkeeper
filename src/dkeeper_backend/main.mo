import Text "mo:base/Text";
import List "mo:base/List";
import Debug "mo:base/Debug";
import Bool "mo:base/Bool";

// created actor canister Dkeeper
actor DKeeper {
  public type Note = {
    id: Text;
    title: Text;
    content: Text;
  };

  /* stable var is crucial for data persistence, 
  so that data doesn't reset on redeploy or changes to code
  List is a type of data structure  in motoko, 
  List.List<typeOfData>, List.nil means an empty array of type Note */
  stable var notes: List.List<Note> = List.nil<Note>();

  // method to store new data with type
  public func createNote(idText: Text, titleText: Text, contentText: Text) {
    let newNote: Note = {
      id = idText;
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

  public func removeNote(id: Text) {
    notes := List.filter(notes, func(item: Note): Bool {
      item.id != id
    });
  };
}