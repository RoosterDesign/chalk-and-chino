import React from "react";

export default function MaintenancePage() {
    return (
        <div
            style={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "2rem",
                textAlign: "center",
                fontFamily: "system-ui, sans-serif",
                backgroundColor: "#faf9f7",
            }}
        >
            <h1
                style={{
                    fontSize: "2.5rem",
                    marginBottom: "1rem",
                    color: "#2d2d2d",
                }}
            >
                Chalk &amp; Chino
            </h1>
            <div
                style={{
                    width: "60px",
                    height: "2px",
                    backgroundColor: "#8b7355",
                    marginBottom: "2rem",
                }}
            />
            <h2
                style={{
                    fontSize: "1.5rem",
                    fontWeight: "normal",
                    marginBottom: "1rem",
                    color: "#555",
                }}
            >
                We&apos;ll be back soon
            </h2>
            <p
                style={{
                    maxWidth: "500px",
                    lineHeight: 1.6,
                    color: "#666",
                }}
            >
                We&apos;re currently making some improvements to our website.
                Please check back shortly.
            </p>
        </div>
    );
}
