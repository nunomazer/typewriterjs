/**
 * 
 * @name:       typewriterjs
 * @version:    4.0.0
 * @author:     EOussama
 * @license     MIT
 * @source:     https://github.com/EOussama/typewriterjs
 *
 * A typewriter for the web.
 * 
 */


/**
 * The typewriter classes.
 */
class Typewriter {


    /**
     * Constructor with parameters.
     * 
     * @param params The configurative parameters of the typewrtier.
     */
    constructor(params: Object = {}) {

        try {
            
            if (params.target == null) {
                throw new TypeError("A valid target is required.");
            }

            if (!(params.target instanceof HTMLElement)) {
                throw new TypeError("The target must be a valid HTML element.");
            }

            this.target = params.target;
            this.script = params.script || this.target.textContent;
            this.speed = params.speed || 1500;
            this.timer = null;
            this.cursor = { index: this.target.textContent.length };
        }
        catch(e) {

            throw e;
        }
    }


    /**
     * Types the content of the typewriter.
     */
    type(): void {

        if (this.script.length > 0) {

            this.timer = setTimeout(() => {
    
                typeChar(this);
    
                if (this.cursor.index !== this.script.length) {
    
                    this.type();
                }
            }, this.speed);
        }


        /**
         * Types a single character in the typewriter.
         * 
         * @param typewriter The typewriter object.
         */
        function typeChar(typewriter: Typewriter): void {

            // Typing a character.
            typewriter.target.textContent += typewriter.script[typewriter.cursor.index];
            
            // Moving the cursor forward.
            typewriter.cursor.index++;
        }
    }


    /**
     * Delete the content of the typewriter.
     */
    delete(): void {

        if (this.script.length > 0) {

            this.timer = setTimeout(() => {
    
                deleteChar(this);

                if (this.cursor.index > 0) {
    
                    this.delete();
                }
            }, this.speed);
        }


        /**
         * Types a single character in the typewriter.
         * 
         * @param typewriter The typewriter object.
         */
        function deleteChar(typewriter: Typewriter): void {

            // Typing a character.
            typewriter.target.textContent = typewriter.script.substring(0, typewriter.cursor.index - 1);
            
            // Moving the cursor forward.
            typewriter.cursor.index--;
        }
    }


    /**
     * Stops the typewriter.
     */
    stop(): void {

        if (this.timer !== null) {

            clearTimeout(this.timer);
        }
    }


    /**
     * Clears the typewriter's input.
     */
    clear(): void {

        this.stop();

        this.target.textContent = "";
        this.cursor.index = 0;
    }
}