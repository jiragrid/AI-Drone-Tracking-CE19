from SugarcraneClass import SugarcaneDisease

# Config for V1
# "hidden_layers": [128, 64, 64, 32]
# "seed": 6985
# "batch_size": 8
# "epochs": 50

config_dir = './SugarcaneDisease/Model/config.json'
run = SugarcaneDisease(config_dir)
run.train()

