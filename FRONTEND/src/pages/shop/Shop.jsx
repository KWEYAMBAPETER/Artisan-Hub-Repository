import { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  Image,
  Text,
  Badge,
  Group,
  Loader,
  Select,
  Container,
  TextInput,
  Title,
  SimpleGrid,
  Pagination,
} from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { API_URL, BACKEND_URL } from "@/constants.js";
import ShopLayout from "@/layouts/ShopLayout.jsx";
import SlidingNotification from "@/components/SlidingNotification.jsx";

function Shop() {
  const [artworks, setArtworks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [category, setCategory] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [status, setStatus] = useState({ type: "", message: "" });

  const itemsPerPage = 9;

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const res = await axios.get(
          `${API_URL}/art-works?filters[artStatus][$eq]=available&populate=images`
        );
        const items = res.data.data;

        // console.log("Artworks response:", res.data);
        // console.log("Artworks items:", items);

        setArtworks(items);
        setFiltered(items);
      } catch (err) {
        console.error("Error fetching artworks: ", err);
        setStatus({ type: "error", message: "Error fetching artworks" });
      } finally {
        setIsLoading(false);
      }
    };

    fetchArtworks();
  }, []);

  useEffect(() => {
    let result = artworks;

    if (category) {
      result = result.filter((art) => art.attributes.category === category);
    }

    if (searchQuery) {
      result = result.filter((art) =>
        art.attributes.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFiltered(result);
    // if (!category) return setFiltered(artworks);
    // setFiltered(artworks.filter((art) => art.attributes.category === category));
  }, [category, searchQuery, artworks]);

  const paginated = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  return (
    <ShopLayout>
      {status.message && (
        <SlidingNotification type={status.type} message={status.message} />
      )}
      <section className="bg-amber-50 py-12 px-4 text-center">
        <h1 className="text-3xl md:text-5xl font-extrabold text-amber-800 mb-4">
          Discover Unique Local Art
        </h1>
        <p className="text-base md:text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed">
          Browse handcrafted pieces from talented artisans in your community.
          Choose your favorites and support creativity.
        </p>
      </section>
      <Container size="lg" py="lg" className="space-y-6">
        {isLoading && (
          <div className="flex justify-center mt-20">
            <Loader size="xl" type="dots" color="#D97706" />
          </div>
        )}
        <Title
          order={2}
          mb="md"
          className="text-center text-amber-800 font-bold"
        >
          Shop Local Artworks
        </Title>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <Select
            label="Filter by Category"
            placeholder="Choose category"
            data={[
              "Paintings",
              "Digital Art",
              "Woodwork",
              "Sculptures",
              "Photography",
            ]}
            value={category}
            onChange={setCategory}
            clearable
            mb="lg"
            className="w-full max-w-xs md:mt-0"
          />

          <TextInput
            placeholder="Search artworks ..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.currentTarget.value)}
            className="max-w-md"
            leftSection={<IconSearch size={16} />}
          />
        </div>

        <SimpleGrid
          cols={{ base: 1, sm: 2, md: 3 }}
          spacing="xl"
          verticalSpacing="lg"
        >
          {paginated.map(({ id, attributes }) => {
            const imgUrl = `${BACKEND_URL}${attributes.images?.data[0]?.attributes?.url}`;

            return (
              <Card
                shadow="sm"
                radius="md"
                withBorder
                key={id}
                className="h-[320px] flex flex-col justify-between"
              >
                <Card.Section>
                  <Image
                    src={imgUrl}
                    h={160}
                    alt={attributes.title}
                    fit="cover"
                  />
                </Card.Section>

                <div className="px-2 py-1">
                  <Group justify="space-between" mt="sm" wrap="nowrap">
                    <Text fw={600} size="md" truncate>
                      {attributes.title}
                    </Text>
                    <Badge color="#D97706" variant="light" size="sm">
                      {attributes.category}
                    </Badge>
                  </Group>

                  <Text
                    fw={700}
                    size="md"
                    mt="xs"
                    mb="xs"
                    className="text-amber-700"
                  >
                    UGX {parseInt(attributes.price).toLocaleString()}
                  </Text>

                  <Link
                    to={`/shop/artwork/${id}`}
                    className="text-center mt-2 text-sm w-full px-3 py-1.5 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition"
                  >
                    View Details
                  </Link>
                </div>
              </Card>
            );
          })}
        </SimpleGrid>

        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination
            total={totalPages}
            value={currentPage}
            onChange={setCurrentPage}
            mt="lg"
            color="#D97706"
            className="mx-auto w-fit"
          />
        )}
      </Container>
    </ShopLayout>
  );
}

export default Shop;
