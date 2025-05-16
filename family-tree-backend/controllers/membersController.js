const db = require('../db');

// Recursive function to build nested family tree
const buildTree = (list, parentId = null) => {
  return list
    .filter(member => member.parent_id === parentId)
    .map(member => ({
      ...member,
      children: buildTree(list, member.id),
    }));
};

// GET all members as a tree
exports.getAllMembers = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM members');
    res.json(buildTree(rows));
  } catch (error) {
    console.error('Error fetching members:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// POST: Create a new member
exports.createMember = async (req, res) => {
  const { name, age, parent_id } = req.body;
  //Validate age
    if (age > 120) {
  return res.status(400).json({ message: "Age cannot be more than 120" });
}

  if (!name || age == null) {
    return res.status(400).json({ error: 'Name and age are required.' });
  }

  try {
    const [result] = await db.query(
      'INSERT INTO members (name, age, parent_id) VALUES (?, ?, ?)',
      [name, age, parent_id || null]
    );
    res.status(201).json({ message: 'Member created', memberId: result.insertId });
  } catch (error) {
    console.error('Error creating member:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// PUT: Update member by ID
exports.updateMember = async (req, res) => {
  const { name, age } = req.body;
  const { id } = req.params;
//Validate age
    if (age > 120) {
  return res.status(400).json({ message: "Age cannot be more than 120" });
}
  if (!name || age == null) {
    return res.status(400).json({ error: 'Name and age are required.' });
  }

  try {
    const [result] = await db.query(
      'UPDATE members SET name = ?, age = ? WHERE id = ?',
      [name, age, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Member not found' });
    }

    res.json({ message: 'Member updated' });
  } catch (error) {
    console.error('Error updating member:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Recursive function to delete member and their descendants
const deleteDescendants = async (id) => {
  const [children] = await db.query('SELECT id FROM members WHERE parent_id = ?', [id]);
  for (const child of children) {
    await deleteDescendants(child.id);
  }
  await db.query('DELETE FROM members WHERE id = ?', [id]);
};

// DELETE: Remove member and all descendants
exports.deleteMember = async (req, res) => {
  const { id } = req.params;

  try {
    await deleteDescendants(id);
    res.json({ message: 'Member and descendants deleted' });
  } catch (error) {
    console.error('Error deleting member:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
