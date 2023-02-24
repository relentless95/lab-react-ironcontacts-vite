import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import contactsData from "./contacts.json";

function App() {
  // const [count, setCount] = useState(0)
  const [contacts, setContacts] = useState(contactsData.slice(0, 5));
  const [randomarray, setRandom] = useState();

  const getRandContact = () => {
    let newContacts = contactsData.slice(5);
    const availableContacts = newContacts.filter((contact) => !contacts.some((c) => c.id === contact.id));
  if (availableContacts.length > 0) {
    const randomContact = availableContacts[Math.floor(Math.random() * availableContacts.length)];
    setContacts((contacts) => [...contacts, randomContact]);
  }
  };

  const sortName = () => {
    const sorted = [...contacts].sort((contactA, contactB) =>
      contactA.name.localeCompare(contactB.name)
    ); // issue with sort function here
    console.log(contacts);
    setContacts(sorted);
  };

  const sortPopularity = () => {
    const sortedPop = [...contacts].sort((a, b) => b.popularity - a.popularity);
    setContacts(sortedPop);
  };

  const deleteContact = (contactid) => {
    // console.log(contactid)
    const filteredContact = contacts.filter((contact) => {
      return contact.id !== contactid;
    });
    setContacts(filteredContact)
  };

  return (
    <div className="App">
      <h1>IronContacts</h1>
      <div>
      <button onClick={getRandContact} className="manage-btns">Add Random Contact</button>
      <button onClick={sortPopularity} className="manage-btns">sort by popularity</button>
      <button onClick={sortName} className="manage-btns">sort by name</button>
      </div>

      <table className="manage-text" >
        <thead className="manage-th">
          <tr>
            <th>Picture</th>
            <th>Name</th>
            <th>Popularity</th>
            {/* <th>Id</th> */}
            <th>Won an Oscar</th>
            <th>Won an Emmy</th>
            <th>Actions</th>
          </tr>
        </thead>
        {contacts.map((contact) => {
          return (
            <tbody key={contact.id}>
              <tr>
                <td>
                  <img
                    src={contact.pictureUrl}
                    alt="actorImage"
                    style={{ width: "100px", height: "150px" }}
                  />
                </td>
                <td>{contact.name}</td>
                <td>{Math.round(`${contact.popularity}` * 100) / 100}</td>
                {/* <td>{contact.id}</td> */}
                {contact.wonOscar ? <td>🏆</td> : <td>❌</td>}
                {contact.wonEmmy ? <td>🏆</td> : <td>❌</td>}
                <td>
                  <button onClick={()=>deleteContact(contact.id)}>Delete</button>
                </td>
              </tr>
            </tbody>
          );
        })}
      </table>
    </div>
  );
}

export default App;
