import { Flex } from "antd";
import { ItemCategory } from "../../global-types";
import { itemCategories } from "../../lib/consts";
import CategorySidebar from "./CategorySidebar";
import ItemsGrid from "./ItemsGrid";

import styles from "./FastCheck.module.scss";
import { useNavigate, useParams } from "react-router-dom";

export default function FastCheck() {
  const navigate = useNavigate();

  const { tabKey } = useParams<{ tabKey?: ItemCategory }>();

  const handelChangeCategory = (categoryName: ItemCategory) => {
    navigate(`/${categoryName}`);
  };

  return (
    <div className={styles.fastCheck}>
      <Flex gap={20}>
        <CategorySidebar
          categories={itemCategories}
          selectedCategory={tabKey!}
          onCategorySelect={handelChangeCategory}
        />
        <ItemsGrid selectedCategory={tabKey!} />
      </Flex>
    </div>
  );
}
