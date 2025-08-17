// server.cjs
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

const users = [
  { id: 1, name: "User1", country: "AZ", joined: "2025-07-01" },
  { id: 2, name: "User2", country: "TR", joined: "2025-07-02" },
  { id: 3, name: "User3", country: "US", joined: "2025-07-03" },
  { id: 4, name: "User4", country: "DE", joined: "2025-07-04" },
  { id: 5, name: "User5", country: "FR", joined: "2025-07-05" },
  { id: 6, name: "User6", country: "GB", joined: "2025-07-06" },
  { id: 7, name: "User7", country: "CN", joined: "2025-07-07" },
  { id: 8, name: "User8", country: "IN", joined: "2025-07-08" },
  { id: 9, name: "User9", country: "BR", joined: "2025-07-09" },
  { id: 10, name: "User10", country: "JP", joined: "2025-07-10" },

  { id: 11, name: "User11", country: "AZ", joined: "2025-07-11" },
  { id: 12, name: "User12", country: "TR", joined: "2025-07-12" },
  { id: 13, name: "User13", country: "US", joined: "2025-07-13" },
  { id: 14, name: "User14", country: "DE", joined: "2025-07-14" },
  { id: 15, name: "User15", country: "FR", joined: "2025-07-15" },
  { id: 16, name: "User16", country: "GB", joined: "2025-07-16" },
  { id: 17, name: "User17", country: "CN", joined: "2025-07-17" },
  { id: 18, name: "User18", country: "IN", joined: "2025-07-18" },
  { id: 19, name: "User19", country: "BR", joined: "2025-07-19" },
  { id: 20, name: "User20", country: "JP", joined: "2025-07-20" },

  { id: 21, name: "User21", country: "AZ", joined: "2025-07-21" },
  { id: 22, name: "User22", country: "TR", joined: "2025-07-22" },
  { id: 23, name: "User23", country: "US", joined: "2025-07-23" },
  { id: 24, name: "User24", country: "DE", joined: "2025-07-24" },
  { id: 25, name: "User25", country: "FR", joined: "2025-07-25" },
  { id: 26, name: "User26", country: "GB", joined: "2025-07-26" },
  { id: 27, name: "User27", country: "CN", joined: "2025-07-27" },
  { id: 28, name: "User28", country: "IN", joined: "2025-07-28" },
  { id: 29, name: "User29", country: "BR", joined: "2025-07-29" },
  { id: 30, name: "User30", country: "JP", joined: "2025-07-30" },

  { id: 31, name: "User31", country: "AZ", joined: "2025-07-31" },
  { id: 32, name: "User32", country: "TR", joined: "2025-08-01" },
  { id: 33, name: "User33", country: "US", joined: "2025-08-02" },
  { id: 34, name: "User34", country: "DE", joined: "2025-08-03" },
  { id: 35, name: "User35", country: "FR", joined: "2025-08-04" },
  { id: 36, name: "User36", country: "GB", joined: "2025-08-05" },
  { id: 37, name: "User37", country: "CN", joined: "2025-08-06" },
  { id: 38, name: "User38", country: "IN", joined: "2025-08-07" },
  { id: 39, name: "User39", country: "BR", joined: "2025-08-08" },
  { id: 40, name: "User40", country: "JP", joined: "2025-08-09" },

  { id: 41, name: "User41", country: "AZ", joined: "2025-08-10" },
  { id: 42, name: "User42", country: "TR", joined: "2025-08-11" },
  { id: 43, name: "User43", country: "US", joined: "2025-08-12" },
  { id: 44, name: "User44", country: "DE", joined: "2025-08-13" },
  { id: 45, name: "User45", country: "FR", joined: "2025-08-14" },
  { id: 46, name: "User46", country: "GB", joined: "2025-08-15" },
  { id: 47, name: "User47", country: "CN", joined: "2025-08-16" },
  { id: 48, name: "User48", country: "IN", joined: "2025-08-17" },
  { id: 49, name: "User49", country: "BR", joined: "2025-08-18" },
  { id: 50, name: "User50", country: "JP", joined: "2025-08-19" },

  { id: 51, name: "User51", country: "AZ", joined: "2025-08-20" },
  { id: 52, name: "User52", country: "TR", joined: "2025-08-21" },
  { id: 53, name: "User53", country: "US", joined: "2025-08-22" },
  { id: 54, name: "User54", country: "DE", joined: "2025-08-23" },
  { id: 55, name: "User55", country: "FR", joined: "2025-08-24" },
  { id: 56, name: "User56", country: "GB", joined: "2025-08-25" },
  { id: 57, name: "User57", country: "CN", joined: "2025-08-26" },
  { id: 58, name: "User58", country: "IN", joined: "2025-08-27" },
  { id: 59, name: "User59", country: "BR", joined: "2025-08-28" },
  { id: 60, name: "User60", country: "JP", joined: "2025-08-29" },

  { id: 61, name: "User61", country: "AZ", joined: "2025-08-30" },
  { id: 62, name: "User62", country: "TR", joined: "2025-08-31" },
  { id: 63, name: "User63", country: "US", joined: "2025-09-01" },
  { id: 64, name: "User64", country: "DE", joined: "2025-09-02" },
  { id: 65, name: "User65", country: "FR", joined: "2025-09-03" },
  { id: 66, name: "User66", country: "GB", joined: "2025-09-04" },
  { id: 67, name: "User67", country: "CN", joined: "2025-09-05" },
  { id: 68, name: "User68", country: "IN", joined: "2025-09-06" },
  { id: 69, name: "User69", country: "BR", joined: "2025-09-07" },
  { id: 70, name: "User70", country: "JP", joined: "2025-09-08" },

  { id: 71, name: "User71", country: "AZ", joined: "2025-09-09" },
  { id: 72, name: "User72", country: "TR", joined: "2025-09-10" },
  { id: 73, name: "User73", country: "US", joined: "2025-09-11" },
  { id: 74, name: "User74", country: "DE", joined: "2025-09-12" },
  { id: 75, name: "User75", country: "FR", joined: "2025-09-13" },
  { id: 76, name: "User76", country: "GB", joined: "2025-09-14" },
  { id: 77, name: "User77", country: "CN", joined: "2025-09-15" },
  { id: 78, name: "User78", country: "IN", joined: "2025-09-16" },
  { id: 79, name: "User79", country: "BR", joined: "2025-09-17" },
  { id: 80, name: "User80", country: "JP", joined: "2025-09-18" },

  { id: 81, name: "User81", country: "AZ", joined: "2025-09-19" },
  { id: 82, name: "User82", country: "TR", joined: "2025-09-20" },
  { id: 83, name: "User83", country: "US", joined: "2025-09-21" },
  { id: 84, name: "User84", country: "DE", joined: "2025-09-22" },
  { id: 85, name: "User85", country: "FR", joined: "2025-09-23" },
  { id: 86, name: "User86", country: "GB", joined: "2025-09-24" },
  { id: 87, name: "User87", country: "CN", joined: "2025-09-25" },
  { id: 88, name: "User88", country: "IN", joined: "2025-09-26" },
  { id: 89, name: "User89", country: "BR", joined: "2025-09-27" },
  { id: 90, name: "User90", country: "JP", joined: "2025-09-28" },

  { id: 91, name: "User91", country: "AZ", joined: "2025-09-29" },
  { id: 92, name: "User92", country: "TR", joined: "2025-09-30" },
  { id: 93, name: "User93", country: "US", joined: "2025-10-01" },
  { id: 94, name: "User94", country: "DE", joined: "2025-10-02" },
  { id: 95, name: "User95", country: "FR", joined: "2025-10-03" },
  { id: 96, name: "User96", country: "GB", joined: "2025-10-04" },
  { id: 97, name: "User97", country: "CN", joined: "2025-10-05" },
  { id: 98, name: "User98", country: "IN", joined: "2025-10-06" },
  { id: 99, name: "User99", country: "BR", joined: "2025-10-07" },
  { id: 100, name: "User100", country: "JP", joined: "2025-10-08" },
];

const stats = {
  totalUsers: users.length,
  activeUsers: 45,
  revenue: 4520,
};

app.get("/", (req, res) => {
  res.send("Mini Analytics API is running 🚀");
});

app.get("/users", (req, res) => {
  res.json(users);
});

app.get("/stats", (req, res) => {
  res.json(stats);
});

// --- Server --- //
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
