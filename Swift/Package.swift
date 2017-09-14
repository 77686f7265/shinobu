import PackageDescription

let package = Package(
    name: "Swift",
    dependencies: [
        .Package(url: "https://github.com/Azoy/Sword", majorVersion: 0, minor: 8)
    ]
)
