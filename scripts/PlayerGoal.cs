using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PlayerGoal : MonoBehaviour
{
    public Paddle Opponetes_Paddle;
    //public string name = "goal";
    //void OnTriggerEnter(Collider other)
    //{
    //    Debug.Log("goal!");
    //}

    void OnTriggerEnter(Collider other)
    {
        Opponetes_Paddle.Accessible_Score++;

    }
}
