import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import "./GuideTour.css";

const GuideTour = ({ onClose }) => {
  const [companyName, setcompanyName] = useState(
    localStorage.getItem("companyName")
  );
  console.log("sadad",companyName)
  const steps = [
    {
      title: `Basic Guidelines to use ${companyName || "this Website"}`,
      description: "Follow these guidelines to get started.",
    },
    {
      slides: [
        {
          image: "/images/Guidelines/Work-Order-1.png",
          title: "Step 1: Create Work Order Time - Part 1",
          description:
            "In the Settings → Work Order Time page, you can define default time parameters for work orders, ensuring consistency in time tracking and scheduling. This allows for automated time allocation, accurate logging, and efficient work order management",
        },
        {
          image: "/images/Guidelines/Work-Order-2.png",
          title: "Step 1: Create Work Order Time - Part 2",
          description: `In the Work Order Time page, you can configure the following settings:
Interval Time: Set the gap between work order entries.
Default Work Order Hours: Define the expected duration for field agents.
Buffer Time: Add extra time for flexibility in scheduling.`,
        },
      ],
    },
    {
      slides: [
        {
          image: "/images/Guidelines/Create-Field-agent.png",
          title: "Step 2: Create Work Order - Field Agent",
          description:
            "To select a field agent, first ensure they are created in the system. Navigate to Users → Field Agent → Create to add a new field agent by filling in the necessary details. Field agents are responsible for handling customer work orders.",
        },
        {
          image: "/images/Guidelines/Create-Customer.png",
          title: "Step 2: Create Work Order - Customer Details",
          description:
            "To enter customer information, navigate to Customers → Create and fill in the necessary details to add a new customer to the system.",
        },
        {
          image: "/images/Guidelines/Create-Work-Order.png",
          title: "Step 2: Create Work Order - Confirmation",
          description:
            "Before finalizing the work order, ensure all details are accurate. Navigate to Work Orders → Create to create a new work order by selecting a customer, assigning a field agent, and filling in the required details.",
        },
      ],
    },
    {
      title: "Great, Now You are Ready to use",
      description:
        "You've successfully completed the guided tour. Enjoy using the website!",
    },
  ];

  const [currentStep, setCurrentStep] = useState(0);
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    if (steps[currentStep].slides) {
      setSlideIndex(0);
    }
  }, [currentStep]);

  const currentStepHasSlides = steps[currentStep].slides;

  const title = currentStepHasSlides
    ? steps[currentStep].slides[slideIndex].title
    : steps[currentStep].title;
  const description = currentStepHasSlides
    ? steps[currentStep].slides[slideIndex].description
    : steps[currentStep].description;

  const renderDescription = (text) => {
    return text.split("\n").map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ));
  };

  const handleNext = () => {
    if (
      currentStepHasSlides &&
      slideIndex < steps[currentStep].slides.length - 1
    ) {
      setSlideIndex(slideIndex + 1);
    } else {
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        onClose();
      }
    }
  };

  const handlePrev = () => {
    if (currentStepHasSlides && slideIndex > 0) {
      setSlideIndex(slideIndex - 1);
    } else if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSlidePrev = () => {
    if (currentStepHasSlides && slideIndex > 0) {
      setSlideIndex(slideIndex - 1);
    }
  };

  const handleSlideNext = () => {
    if (
      currentStepHasSlides &&
      slideIndex < steps[currentStep].slides.length - 1
    ) {
      setSlideIndex(slideIndex + 1);
    }
  };

  // Create a key so that whenever currentStep or slideIndex changes, the content remounts
  const contentKey = currentStepHasSlides
    ? `${currentStep}-${slideIndex}`
    : currentStep;

  return (
    <div className="guide-overlay">
      <div className="guide-box">
        {/* Wrap dynamic content with a key and apply a CSS class that triggers animation */}
        <div key={contentKey} className="fade-in">
          <h3 className="mb-3">{title}</h3>
          {currentStepHasSlides && (
            <div className="d-flex align-items-center justify-content-center image-slider">
              <Button
                style={{
                  background: "#00000012",
                  color: "black",
                  border: "none",
                }}
                onClick={handleSlidePrev}
                disabled={slideIndex === 0}
              >
                &lt;
              </Button>
              <img
                src={steps[currentStep].slides[slideIndex].image}
                alt={`Slide ${slideIndex + 1}`}
                className="slider-image"
                style={{ width: "80%", margin: "0 10px" }}
              />
              <Button
                style={{
                  background: "#00000012",
                  color: "black",
                  border: "none",
                }}
                onClick={handleSlideNext}
                disabled={slideIndex === steps[currentStep].slides.length - 1}
              >
                &gt;
              </Button>
            </div>
          )}
          <p className="mt-3">{renderDescription(description)}</p>
        </div>
        <div className="guide-buttons">
          {(currentStep > 0 || (currentStepHasSlides && slideIndex > 0)) && (
            <Button variant="secondary" onClick={handlePrev}>
              Previous
            </Button>
          )}
          <Button
            style={{ background: "#2e2e32", border: "none" }}
            onClick={handleNext}
          >
            {currentStep === steps.length - 1 &&
            (!currentStepHasSlides ||
              slideIndex === steps[currentStep].slides.length - 1)
              ? "Okay, Got It"
              : "Next"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GuideTour;
