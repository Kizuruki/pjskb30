import { $view } from "../app";
import { SongTableRow } from "../components/SongTableRow";
import { goToImageView } from "../draw/draw";
import { $chartConstantData, $sortedIds } from "../signals/chartConstants";
import { $clearData, $pinnedChart } from "../signals/clearData";
import { $currentLanguage } from "../signals/settings";

export function MainView() {
    const songs = $chartConstantData.value.data;
    if (songs == null) {
        return <></>;
    }
    return (
        <div class="container">
            <h2 class="is-size-4">Kizu Charts B30 Data Entry</h2>
            <article class="message">
                <div class="message-body">
                    <p>Mark charts with either AP or FC. The charts are ordered by difficulty and your scores will create an image with your best 30 scores and average skill level. 
                    Once you have marked 30 or more charts, charts that would not make it into the b30 are grayed out. </p>
                    <p>You can pin a chart by clicking the "Pinned" column. A pinned chart always appears at the front.</p>
                    <p>Special thanks to auburnsummer for making this possible.</p>
                    <p><a href="https://docs.google.com/spreadsheets/d/1AxdRCh55cuaXY_yDnAGmxS9m2rtt_DsKutUyeLPNf6k/edit?usp=sharing">View Constants Spreadsheet</a></p>
                </div>
            </article>
            <div class="pb-2 pt-2 is-flex is-flex-direction-row is-gap-1">
                <label for="language-select">Song Language (not server):</label>
                <select
                    name="language"
                    id="language-select"
                    class="select is-small"
                    onChange={e => $currentLanguage.value = (e.target as HTMLSelectElement).value}
                >
                    <option value="en">English</option>
                    <option value="jp">Japanese</option>
                </select>
                <button
                    onClick={() => {
                        $clearData.value = {};
                        $pinnedChart.value = "";
                    }}
                    class="button is-small is-danger"
                >
                    Reset Everything
                </button>
                <button
                    onClick={() => goToImageView($view, 'konva-container')}
                    class="button is-small is-primary"
                >
                    Generate Image
                </button>
            </div>
            <table class="table">
                <thead>
                    <tr>
                        <th>Song</th>
                        <th>Difficulty</th>
                        <th>In-Game Difficulty</th>
                        <th>AP/FC</th>
                        <th>Pinned</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        $sortedIds.value.map(uid => <SongTableRow song={songs[uid]} />)
                    }
                </tbody>
            </table>
        </div>
    );
}
