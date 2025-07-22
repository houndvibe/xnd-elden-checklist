import { useEffect, useMemo, useState } from "react";
import { Card, Flex, InputNumber, Switch } from "antd";

import { useDispatch } from "react-redux";
import { useAppSelector } from "../../store/typedDispatch";

import { DiscoveryItemSelect } from "./DiscoveryItemsSelect";
import ExamplesTable from "./ExamplesTable";

import { discoveryData, DiscoveryItem } from "./data-discovery";
import { BASE_DISCOVERY, STAT_MAX_VALUE } from "../../lib/consts";

import styles from "./DiscoveryCalculator.module.scss";
import { t } from "../../i18n";
import { setDiscovery } from "../../store/settingsSlice";

type NullableString = string | null;
type SelectorProps = {
  value: NullableString;
  onChange: React.Dispatch<React.SetStateAction<NullableString>>;
};

const AmuletSelect = ({ value, onChange }: SelectorProps) => (
  <DiscoveryItemSelect
    items={discoveryData.amulets}
    placeholder={t("misc", "Select an amulet")}
    value={value}
    onChange={onChange}
  />
);

const HelmetSelect = ({ value, onChange }: SelectorProps) => (
  <DiscoveryItemSelect
    items={discoveryData.helmets}
    placeholder={t("misc", "Select a helmet")}
    value={value}
    onChange={onChange}
  />
);

const ConsumableSelect = ({ value, onChange }: SelectorProps) => (
  <DiscoveryItemSelect
    items={discoveryData.consumables}
    placeholder={t("misc", "Select consumable")}
    value={value}
    onChange={onChange}
  />
);

export default function DiscoveryCalculator() {
  const dispatch = useDispatch();
  const storedDiscovery = useAppSelector((state) => state.settings.discovery);

  const [arcane, setArcane] = useState(0);
  const [rune, setRune] = useState(false);
  const [oath, setOath] = useState(false);
  const [chest, setChest] = useState(false);
  const [amulet, setAmulet] = useState<NullableString>(null);
  const [helm, setHelm] = useState<NullableString>(null);
  const [consumable, setConsumable] = useState<NullableString>(null);

  const getItemEffect = (name: NullableString, source: DiscoveryItem[]) => {
    const item = source.find((i) => i.name === name);
    return item
      ? {
          arcane: item.effect.arcaneGain,
          discovery: item.effect.discoveryGain,
        }
      : {
          arcane: 0,
          discovery: 0,
        };
  };

  const calculatedDiscovery = useMemo(() => {
    const amuletEffect = getItemEffect(amulet, discoveryData.amulets);
    const helmEffect = getItemEffect(helm, discoveryData.helmets);
    const consumableEffect = getItemEffect(
      consumable,
      discoveryData.consumables
    );

    const arcaneBonus =
      amuletEffect.arcane +
      helmEffect.arcane +
      consumableEffect.arcane +
      (chest ? 2 : 0) +
      (rune ? 5 : 0) +
      (oath ? 5 : 0);

    const arcaneWithBonus = arcane + arcaneBonus;

    const calculatedArcane =
      arcaneWithBonus >= STAT_MAX_VALUE ? STAT_MAX_VALUE : arcaneWithBonus;

    const discoveryBonus =
      amuletEffect.discovery +
      helmEffect.discovery +
      consumableEffect.discovery;

    return BASE_DISCOVERY + calculatedArcane + discoveryBonus;
  }, [arcane, rune, oath, chest, amulet, helm, consumable]);

  useEffect(() => {
    dispatch(setDiscovery(calculatedDiscovery));
  }, [calculatedDiscovery, dispatch]);

  const formFields = [
    {
      label: t("misc", "Arcane"),
      component: (
        <InputNumber
          min={0}
          max={99}
          value={arcane}
          onChange={(v) => setArcane(v ?? 0)}
          className={styles.inputNumber}
        />
      ),
    },
    {
      label: t("misc", "Godrick's Great Rune"),
      component: <Switch checked={rune} onChange={setRune} />,
    },
    {
      label: t("misc", "Oath of Vengeance"),
      component: <Switch checked={oath} onChange={setOath} />,
    },
    {
      label: t("misc", "Thiollier's Garb"),
      component: <Switch checked={chest} onChange={setChest} />,
    },
    {
      label: t("misc", "Amulet"),
      component: <AmuletSelect value={amulet} onChange={setAmulet} />,
    },
    {
      label: t("misc", "Helm"),
      component: <HelmetSelect value={helm} onChange={setHelm} />,
    },
    {
      label: t("misc", "Consumable"),
      component: (
        <ConsumableSelect value={consumable} onChange={setConsumable} />
      ),
    },
  ];

  return (
    <Card className={styles.calculator}>
      <Flex className={styles.mainFlex}>
        <Flex vertical className={styles.formContainer}>
          {formFields.map(({ label, component }, idx) => (
            <div key={idx} className={styles.formRow}>
              <label className={styles.label}>{label}</label>
              {component}
            </div>
          ))}
        </Flex>

        <Flex vertical className={styles.resultsContainer}>
          <div className={styles.totalLabel}>
            {t("misc", "Total Discovery") + ":"}
          </div>
          <div className={styles.totalValue}>{storedDiscovery}</div>
        </Flex>

        <Flex vertical gap={10}>
          <ExamplesTable calculatedDiscovery={storedDiscovery} />
        </Flex>
      </Flex>
    </Card>
  );
}
