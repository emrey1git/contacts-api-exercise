// In-memory contacts
let contacts = [
  { id: 1, name: "Ahmet", phone: "555-1234", email: "ahmet@mail.com" },
  { id: 2, name: "Ayşe", phone: "555-5678", email: "ayse@mail.com" },
];

// GET /contacts
export const getContact = (req, res) => {
  res.json(contacts);
};

// GET /contacts/:id
export const getContactById = (req, res) => {
  const id = parseInt(req.params.id);
  const contact = contacts.find(c => c.id === id);
  if (!contact) return res.status(404).json({ message: "Contact bulunamadı" });
  res.json(contact);
};

// POST /contacts
export const createContact = (req, res) => {
  const { name, phone, email } = req.body;
  if (!name || !phone) return res.status(400).json({ message: "Name ve phone zorunlu" });

  const newContact = {
    id: contacts.length + 1,
    name,
    phone,
    email: email || "",
  };
  contacts.push(newContact);
  res.status(201).json(newContact);
};

//PUT /contacts/:id //tam günclleme
export const putContactById =(req,res)=>{
    const id = parseInt(req.params.id);
    const contact = contacts.find(c=>c.id===id);
    if(!contact) return res.status(404).json({ message: "Contact bulunamadı"});
    
    const {name,phone,email}=req.body;
    if(!name || !phone) return res.status(400).json({message: "Name ve phone zorunlu" });

     // Var olan contact’ı tamamen güncelle
  contact.name = name;
  contact.phone = phone;
  contact.email = email || "";

  res.json(contact);
}

//PATCH /contacts/:id kısmi güncelleme
export const patchContactById = (req,res)=>{
    const id=parseInt(req.params.id);
    const contact = contacts.find(c=>c.id===id);
    if(!contact) return res.status(404).json({ message: "Contact bulunamadı" });

     const { name, phone, email } = req.body;

     if(name !== undefined) contact.name =name;
     if(phone !== undefined) contact.phone = phone;
     if(email !== undefined) contact.email = email;

      res.json(contact);
}
// DELETE /contacts/:id
export const deleteContact = (req, res) => {
  const id = parseInt(req.params.id);
  const index = contacts.findIndex(c => c.id === id);
  if (index === -1) return res.status(404).json({ message: "Contact bulunamadı" });

  const deleted = contacts.splice(index, 1);
  res.json(deleted[0]);
};
