const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url === "/api/register" && req.method === "POST") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => {
      try {
        const userData = JSON.parse(body);

        const { username, email, password } = userData;

        // Validation

        if (!username || !email || !password) {
          res.writeHead(400, {
            "Content-Type": "application/json",
          });

          res.end(
            JSON.stringify({
              success: false,
              message: "All fields are required",
            }),
          );

          return;
        }

        if (!email.includes("@")) {
          res.writeHead(400, {
            "Content-Type": "application/json",
          });

          res.end(
            JSON.stringify({
              success: false,
              message: "Invalid email",
            }),
          );

          return;
        }

        if (password.length < 6) {
          res.writeHead(400, {
            "Content-Type": "application/json",
          });

          res.end(
            JSON.stringify({
              success: false,
              message: "Password must be at least 6 characters",
            }),
          );

          return;
        }

        // Success

        res.writeHead(201, {
          "Content-Type": "application/json",
        });

        res.end(
          JSON.stringify({
            success: true,
            message: "User Registered Successfully",
          }),
        );
      } catch (error) {
        res.writeHead(400, {
          "Content-Type": "application/json",
        });

        res.end(
          JSON.stringify({
            success: false,
            message: "Invalid JSON format",
          }),
        );
      }
    });
  } else {
    res.writeHead(404);

    res.end("Route Not Found");
  }
});

server.listen(3000, () => {
  console.log("TaskFlow Pro Server Running on Port 3000");
});
// Practicing Git diff
// login started
// Updated from github
const appAlias = "taskFlow Pro - Beta";
