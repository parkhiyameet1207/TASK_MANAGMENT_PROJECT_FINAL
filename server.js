const express = require("express");
const mongoose = require("mongoose");


mongoose.connect("mongodb://localhost:27017/TasksList");
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());
const Schema = mongoose.Schema;

const subtTaskSchema = new Schema({
  title: String,
  cardId: String,
  listId: { type: Schema.Types.ObjectId, ref: 'MainTask' },
  index: Number
});

const mainTaskSchema = new Schema({
  title: String,
  subtasks: [{ type: Schema.Types.ObjectId, ref: 'SubtTask' }],
  index: Number

});

const MainTask = mongoose.model('maintask', mainTaskSchema);
const SubtTask = mongoose.model('subtask', subtTaskSchema);

app.post('/api/board/addlist', async (req, res) => {
  const { listId, title, index } = req.body
  let data = new MainTask({ title: title, index: index });
  await data.save();
  res.send(data);
});

app.get('/api/board/getlsit', async (req, res) => {
  let db = MainTask;
  let data = await db.find().exec();
  res.send(data);
})
app.post('/api/board/addcard', async (req, res) => {
  const { cardText, cardId, listId, index } = req.body;
  let mainTask = await MainTask.findById(listId);
  console.log("mainTask", mainTask.subtasks);
  let data = new SubtTask({ title: cardText, cardId: cardId, listId: listId, index: index });
  await data.save();
  res.send(data);
});

app.get('/api/board/getcard', async (req, res) => {
  let db = SubtTask;
  let data = await db.find().exec();
  res.json(data);
})



app.put('/api/board/lists/:listId', async (req, res) => {
  try {
    const { listId } = req.params;
    const { title } = req.body;

    const updatedList = await SubtTask.findByIdAndUpdate(
      listId,
      { title },
      { new: true }
    );

    res.json(updatedList);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});
app.put('/api/board/card/:listId', async (req, res) => {
  try {
    const { listId } = req.params;
    const { title } = req.body;
    const updatedList = await MainTask.findByIdAndUpdate(
      listId,
      { title },
      { new: true }
    );
    res.json(updatedList);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.delete('/api/board/lists/:listId', async (req, res) => {
  try {
    const { listId } = req.params;
    await SubtTask.findByIdAndDelete(listId);
    res.json({ message: 'List deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});
app.delete('/api/board/listdata/:listId', async (req, res) => {
  try {
    const { listId } = req.params;
    await MainTask.findByIdAndDelete(listId);
    await SubtTask.deleteMany({ listId });
    res.json({ message: 'List deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});



// app.put("/api/board/cardmove", async (req, res) => {
//   const { sourceListId, destListId, oldCardIndex, newCardIndex } = req.body;

//   try {
//     let db = SubtTask;
//     let data = await db.find().exec();

//     let alldata = data.filter((item) => item.listId == sourceListId);

//     if (oldCardIndex < 0 || oldCardIndex >= alldata.length || newCardIndex < 0 || newCardIndex >= alldata.length) {
//       return res.status(400).json({ error: 'Invalid index values' });
//     }

//     const [movedItem] = alldata.splice(oldCardIndex, 1);
//     alldata.splice(newCardIndex, 0, movedItem);

//     await SubtTask.deleteMany({ listId: sourceListId });
//     await SubtTask.insertMany(alldata);


//     res.json(alldata);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

app.put("/api/board/listmove", async (req, res) => {
  console.log("req.body", req.body);
  try {
    let db = MainTask;
    let data = await db.find().exec();
    const { oldListIndex, newListIndex } = req.body;
    const [removedList] = data.splice(oldListIndex, 1);
    data.splice(newListIndex, 0, removedList);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



app.put("/api/board/cardmove", async (req, res) => {
  const { sourceListId, destListId, oldCardIndex, newCardIndex } = req.body;
  try {
    const sourceListCards = await SubtTask.find({ listId: sourceListId }).exec();
    const destListCards = await SubtTask.find({ listId: destListId }).exec();

    if (oldCardIndex < 0 || oldCardIndex >= sourceListCards.length || newCardIndex < 0 || newCardIndex > destListCards.length) {
      return res.status(400).json({ error: 'Invalid index values' });
    }

    const [movedCard] = sourceListCards.splice(oldCardIndex, 1);
    movedCard.listId = destListId;
    destListCards.splice(newCardIndex, 0, movedCard);

    await SubtTask.deleteOne({ _id: movedCard._id });

    await SubtTask.insertMany([movedCard]);
    const result = [...sourceListCards, ...destListCards]
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }

});




app.listen(5000);