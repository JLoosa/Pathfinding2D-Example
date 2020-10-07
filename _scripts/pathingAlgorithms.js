/**
 * @author Jacob Loosa
 * @copyright
 * Pathfinding2D-Example: An MVC approach to an HTML pathfinding visualizer.
 * Copyright (C) 2020 Jacob Loosa
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

/**
 * Parent class of all Pathfinding Algorithms (not that this means anything in JS...)
 */
class PathAlgorithm {

    /**
     * Creates a new instance of a PathAlgorithm
     */
    constructor() {
        if (new.target === PathAlgorithm) throw Error("Pathfinding algorithm must provide a tick function!");
        this.start = 0; // This would be the top, left-hand corner
        this.end = 0;
        this.doneCalulating = false
    }

    pathStep() {}

    pathCalculate() {
        while (!this.doneCalulating) this.pathStep();
    }
}

