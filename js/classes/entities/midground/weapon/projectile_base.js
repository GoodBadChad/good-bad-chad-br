/**
 * Class which provides basic functionality for enemy entities, including movement,
 * taking damage, and block collisions.
 * 
 * @author Nathan Hinthorne
 * @author Trae Claar
 */
class ProjectileBase {
    /**
     * Constructor for a ProjectileBase.
     * 
     * @param {Entity} projectile the projectile associated with this projectileBase
     * @param {Vector} startPos the initial position of the projectile
     * @param {Vector} targetPos the target position of the projectile
     * @param {number} scaledSize the size of the projectile on the CANVAS
     * @param {number} speed the speed of the projectile
     * @param {function} onBlockCollision callback function invoked when the projectile collides with a block
     * @param {function} onEnemyCollision callback function invoked when the projectile collides with an enemy
     */
    constructor(projectile, startPos, targetPos, scaledSize, speed, weight, onBlockCollision, onEnemyCollision) {
        this.projectile = projectile;
        projectile.pos = startPos;
        projectile.targetPos = targetPos;
        
        projectile.action = "firing"; // or "idle" to start with?
        projectile.scaledSize = scaledSize;
        projectile.speed = speed;
        projectile.weight = weight;
        projectile.yVelocity = 0;

        projectile.applyGravity = true; // used for bouncing projectiles
        projectile.hasHit = false;

        projectile.boundingBox = new BoundingBox(startPos, scaledSize);
        projectile.lastBoundingBox = this.projectile.boundingBox;

        this.onBlockCollision = onBlockCollision;
        this.onEnemyCollision = onEnemyCollision;

        // determine what direction to travel in
        projectile.dir = Vector.direction(startPos, targetPos);
    }

    /**
     * Updates the projectile's position and checks for collisions.
     */
    update() {
        // move the projectile
        if (!this.projectile.applyGravity) {
            this.projectile.yVelocity = 0;
        } else {
            this.projectile.yVelocity += PHYSICS.GRAVITY_ACC * GAME.clockTick * this.projectile.weight;

            // max out all downwards speed at the terminal velocity
            // if (this.yVelocity > PHYSICS.TERMINAL_VELOCITY) {
            //     this.yVelocity = PHYSICS.TERMINAL_VELOCITY;
            // }
        }

        const pos = Vector.multiply(this.projectile.dir, this.projectile.speed);
        const syncedPos = Vector.multiply(pos, GAME.clockTick * 100);

        this.projectile.pos = Vector.add(this.projectile.pos, new Vector(syncedPos.x, syncedPos.y + this.projectile.yVelocity));

        // update the bounding box
        this.projectile.lastBoundingBox = this.projectile.boundingBox;
        this.projectile.boundingBox = new BoundingBox(this.projectile.pos, this.projectile.scaledSize);

        // check for collisions
        GAME.entities.midground.forEach((otherEntity) => {
            if (otherEntity instanceof Block) {
                if (this.projectile.boundingBox.collide(otherEntity.boundingBox)) {
                    this.onBlockCollision(otherEntity);
                }
            } else if (otherEntity.isEnemy) { // isEnemy is a property of all enemy entities that use BaseEnemy
                if (this.projectile.boundingBox.collide(otherEntity.boundingBox)) {
                    this.onEnemyCollision(otherEntity);
                }
            }
        });
    }
}