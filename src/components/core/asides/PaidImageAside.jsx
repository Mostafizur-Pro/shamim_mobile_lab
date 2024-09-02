import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import "./PaidImageAside.css";

const PaidImageAside = () => {
  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/location.json");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setLocations(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/category.json");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <aside className=" lg:px-5 lg:py-5 px-3 py-3 space-y-3  z-10 ">
      {/* Category List */}
      <div>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="part-2">
            <AccordionTrigger className="text-xl font-semibold">
              Category
            </AccordionTrigger>
            <AccordionContent>
              <Accordion type="single" collapsible className="w-full">
                {categories.map((category, index) => (
                  <>
                    <AccordionItem value={index + 1}>
                      <AccordionTrigger>{category?.category}</AccordionTrigger>
                      <AccordionContent>
                        <ul className="list-disc ml-10">
                          {category.subcategory.map((sub, index) => (
                            <Link
                              key={index}
                              to={`/paid-image-post?searchTerm=${sub}`}
                            >
                              {/* /paid-image-post?searchTerm=${thana?.thana} */}
                              <li>{sub}</li>
                            </Link>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </>
                ))}
              </Accordion>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      {/* Pages */}
      <div>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="part-1">
            <AccordionTrigger className="text-xl font-semibold">
              Location
            </AccordionTrigger>
            <AccordionContent>
              <Accordion type="single" collapsible className="w-full ml-3">
                {locations.map((location, index) => (
                  <AccordionItem key={index + 1} value={index + 1}>
                    <AccordionTrigger>{location?.division}</AccordionTrigger>
                    <AccordionContent>
                      <Accordion
                        type="single"
                        collapsible
                        className="w-full ml-3"
                      >
                        {location.districtList.map((district, idx) => (
                          <AccordionItem key={idx + 1} value={idx + 1}>
                            <AccordionTrigger>
                              {district.district}
                            </AccordionTrigger>
                            <AccordionContent>
                              <Accordion
                                type="single"
                                collapsible
                                className="w-full ml-3"
                              >
                                {district.thanaList.map((thana, idx) => (
                                  <AccordionItem key={idx + 1} value={idx + 1}>
                                    <AccordionTrigger>
                                      <Link
                                        to={`/paid-image-post?searchTerm=${thana?.thana}`}
                                      >
                                        {thana?.thana}
                                      </Link>
                                    </AccordionTrigger>
                                    <AccordionContent>
                                      <ul className="list-disc ml-10">
                                        {thana.wardList.map((ward, i) => (
                                          <li key={i}>{ward.ward}</li>
                                        ))}
                                      </ul>
                                    </AccordionContent>
                                  </AccordionItem>
                                ))}
                              </Accordion>
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </aside>
  );
};

export default PaidImageAside;
