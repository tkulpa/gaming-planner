import { useCallback, useState } from 'react'
import ReactTags, { Tag } from 'react-tag-autocomplete'
import debounce from 'lodash/debounce';
import { FaXbox, FaPlaystation, FaRegSave } from 'react-icons/fa';
import { BsNintendoSwitch } from 'react-icons/bs';
import { GiComputerFan } from 'react-icons/gi';

export interface Game {
  created_at: string;
  name: string,
  discord_user_id: string;
  igdb_game_id: number;
}

export interface GamingPlatforms {
  pc: boolean | null
  xbox: boolean | null
  playstation: boolean | null
  switch: boolean | null
}

export interface PlannerProps {
  games: Game[],
  gamingPlatforms: GamingPlatforms
}

const gamingPlatformButtonStyle = { padding: 4, display: 'flex', alignItems: 'center' }
const selectedGamingPlatformButtonStyle = { backgroundColor: 'green', color: 'white' }

const PlatformButton = ({selected, children, onClick }: any): JSX.Element => {
  return (
    <button style={{ ...gamingPlatformButtonStyle, ...(selected ? selectedGamingPlatformButtonStyle : {}) }} onClick={onClick}>{children}</button>
  )
}

const Planner = ({ games, gamingPlatforms }: PlannerProps): JSX.Element => {
  const [selectedGames, setSelectedGames] = useState<Tag[]>(games.map((game) => ({
    id: game.igdb_game_id,
    name: game.name,
  })))
  const [isInputBusy, setIsInputBusy] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [suggestions, setSuggestions] = useState<Tag[]>([])
  const [selectedGamingPlatforms, setSelectedGamingPlatforms] = useState({
    pc: gamingPlatforms?.pc ?? false,
    xbox: gamingPlatforms?.xbox ?? false,
    playstation: gamingPlatforms?.playstation ?? false,
    switch: gamingPlatforms?.switch ?? false,
  })

  const onDelete = useCallback((gameIndex: number) => {
    setSelectedGames(selectedGames.filter((_, i) => i !== gameIndex))
  }, [selectedGames])

  const onAddition = useCallback((newGame: Tag) => {
    setSelectedGames([...selectedGames, newGame])
  }, [selectedGames])

  const onInput = (query: string) => {
    if (!isInputBusy && query.length >= 2) {
      setIsInputBusy(true)

      return fetch(`/api/games?searchTerm=${query}`)
        .then((response) => response.json())
        .then((data: Tag[]) => {
          setIsInputBusy(false)
          if (data instanceof Array) {
            setSuggestions(data)
          }
        }).finally(() => setIsInputBusy(false))
    }
  }

  const debouncedOnInput = useCallback(debounce(onInput, 700), [selectedGames])

  return (<>
    <div style={{ display: 'inline-flex', flexWrap: 'wrap', alignItems: 'center', flexDirection: 'row', gap: 12, marginBottom: 8 }}>
      Wybierz platformy:
      <PlatformButton selected={selectedGamingPlatforms.pc} onClick={() => setSelectedGamingPlatforms(prevState => ({ ...prevState, pc: !prevState.pc }))}><GiComputerFan />&nbsp;PC</PlatformButton>
      <PlatformButton selected={selectedGamingPlatforms.xbox} onClick={() => setSelectedGamingPlatforms(prevState => ({ ...prevState, xbox: !prevState.xbox }))}><FaXbox />&nbsp;Xbox</PlatformButton>
      <PlatformButton selected={selectedGamingPlatforms.playstation} onClick={() => setSelectedGamingPlatforms(prevState => ({ ...prevState, playstation: !prevState.playstation }))}><FaPlaystation />&nbsp;PS</PlatformButton>
      <PlatformButton selected={selectedGamingPlatforms.switch} onClick={() => setSelectedGamingPlatforms(prevState => ({ ...prevState, switch: !prevState.switch }))}><BsNintendoSwitch />&nbsp;Switch</PlatformButton>
    </div>
    <span>
      <ReactTags
        tags={selectedGames}
        maxSuggestionsLength={15}
        suggestions={suggestions}
        onDelete={onDelete}
        onAddition={onAddition}
        allowBackspace={false}
        suggestionsFilter={() => true}
        onInput={debouncedOnInput}
        placeholderText="Wpisz nazwę gry, która cię interesuje"
      />
      {isInputBusy && <p>Wczytywanie...</p>}
    </span>
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: 8 }}>
      <button disabled={isSaving} style={{ padding: 4, display: 'flex', alignItems: 'center' }} onClick={() => {
        setIsSaving(true)
        return fetch(`/api/save`, {
          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            selectedGamingPlatforms,
            selectedGames
          })
        })
          .then((response) => response.json())
          .then((data) => {
            console.log('data', data)
          })
          .catch((error) => {
            console.error("Error:", error);
          }).finally(() => {
            setIsSaving(false)
          });

      }}><FaRegSave />&nbsp;Zapisz</button>
    </div>
  </>);
};

export default Planner;