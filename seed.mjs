import 'dotenv/config'
import { MongoClient, ServerApiVersion } from 'mongodb';

const uri = process.env.MONGO_URI;

// Create a MongoClient
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// Sample data
  const sampleGames = [
    { game: "Balatro", hours: 11.3, price: 15.99, createdBy: req.user.username, createdAt: new Date() },
    { game: "Baldurs Gate 3", hours: 490.9, price: 59.99, createdBy: req.user.username, createdAt: new Date() },
    { game: "Dishonored 2", hours: 176.4, price: 9.99, createdBy: req.user.username, createdAt: new Date() },
    { game: "Elden Ring", hours: 287.1, price: 59.99, createdBy: req.user.username, createdAt: new Date() },
    { game: "Skryim", hours: 863.6, price: 9.99, createdBy: req.user.username, createdAt: new Date() },
    { game: "Slay the Spire", hours: 101, price: 24.99, createdBy: req.user.username, createdAt: new Date() },
    { game: "Starwars: KOTOR 2", hours: 226.1, price: 9.99, createdBy: req.user.username, createdAt: new Date() }
  ];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await client.connect();
    console.log("Connected to MongoDB Atlas!");

    const db = client.db("steam_apps");
    const collection = db.collection("time");

    // Check if students already exist
    const existingCount = await collection.countDocuments();
    console.log(`Found ${existingCount} existing games`);

    if (existingCount > 0) {
      console.log("Clearing existing entries before seeding...");
      await collection.deleteMany({});
      console.log("Existing data cleared");
    }

    // Insert sample students
    const result = await collection.insertMany(sampleStudents);
    console.log(`Successfully seeded ${result.insertedCount} games!`);
    
    // Display inserted students
    console.log("Sample games added:");
    sampleGames.forEach((game, index) => {
      console.log(`${index + 1}. ${time.game} (Hours: ${time.hours}, Price: ${time.price})`);
    });

  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    // Close the connection
    await client.close();
    console.log("Database connection closed");
  }
}

// Run the seed function
seedDatabase().catch(console.dir);
